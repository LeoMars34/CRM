import { useEffect, useContext, useState } from "react";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { getCurrentClient, getManagersTelefony } from "../Api";
import { CustomContext } from "../components/Service/Context";
import { Loader } from "../components/Elements/Loader";
import { PopUpTelefony } from "../components/Telefony/PopUpTelefony";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { Link } from "react-router-dom";
import { Button } from "../components/Elements/Button";
import { PopUpRedactorSales } from "../components/Sales/PopUpRedactorSales";
import { ClientCard } from "../components/Clients/ClientCard";

function Telefhony() {
    const { admin } = useContext(CustomContext);
    const [managers, setManagers] = useState([]);
    const [currentClient, setCurrentClient] = useState();
    const [telefony, setTelefony] = useState();
    const [loader, setLoader] = useState(false);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState();
    const [link, setLink] = useState("");
    const [url, setUrl] = useState();
    const [method, setMethod] = useState("statistics");
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[4].classList.add("hovered");
        getManagersTelefony(`${method}&page_size=100`).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setTelefony(data);
                setCurrentPage(1);
            }
        });
    }, []);
    useEffect(() => {
        if (admin) {
            getManagersTelefony("abonents").then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setManagers(data);
                }
            });
        }
    }, [admin]);
    if (managers.length > 0) {
        managers.forEach((user, i) => {
            if (user.firstName) {
                managers[i]["name"] = `${user.firstName} ${user.lastName}`;
            }
            if (!user.firstName) {
                managers[i]["name"] = `${user.lastName}`;
            }
            managers[i]["id"] = user.userId;
        });
    }
    /*Фильтрация звонков*/
    function filtrManagersTelefony() {
        setLoader(true);
        let managersTelefonyId = document.getElementById("managersTelefonyId");
        let dateStartTelefonyId = document.getElementById(
            "dateStartTelefonyId"
        );
        let dateEndTelefonyId = document.getElementById("dateEndTelefonyId");
        let newLink = "";
        if (managersTelefonyId && managersTelefonyId.value != "") {
            newLink = newLink + `&user_id=${managersTelefonyId.value}`;
        }
        if (dateStartTelefonyId && dateStartTelefonyId.value != "") {
            newLink = newLink + `&date_start=${dateStartTelefonyId.value}`;
        }
        if (dateEndTelefonyId && dateEndTelefonyId.value != "") {
            newLink = newLink + `&date_end=${dateEndTelefonyId.value}`;
        }
        setLink(newLink);
        getManagersTelefony(`statistics&page_size=100${newLink}`).then(
            (data) => {
                setCurrentPage(1);
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setTelefony(data);
                }
            }
        );
        setLoader(false);
    }
    /*Поиск по Telefony
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrManagersTelefony();
            return;
        }
        e.target.value = search;
        setMethod("search");
        getManagersTelefony(`search&phone=${search}`).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                if (response.next_page) {
                    setCurrentPage(response.next_page);
                } else {
                    setCurrentPage();
                }
                setTelefony(response.results);
            }
            setLoader(false);
        });
    }
    /*Функция скроллинга для таблицы клиентов*/
    let prevScrollTop = 0;
    const scrollHandler = (e) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPage &&
            !loading
        ) {
            setLoading(true);
            let linkRequest = "";
            if (method == "search") {
                linkRequest = `${method}${currentPage.split("search")[1]}`;
            } else {
                linkRequest = `${method}&page=${currentPage}&page_size=100${link}`;
            }
            getManagersTelefony(linkRequest).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    if (data.length === 0) {
                        setCurrentPage();
                        return;
                    }
                }
                if (method == "search") {
                    setTelefony((prevState) => [...prevState, ...data.results]);
                    if (data.next_page) {
                        setCurrentPage(data.next_page);
                    } else {
                        setCurrentPage();
                    }
                } else {
                    setTelefony((prevState) => [...prevState, ...data]);
                    setCurrentPage((prevState) => {
                        return prevState + 1;
                    });
                }
                setLoading(false);
            });
        }
    };
    /*Функция перевода длительности звонка в минуты и секунды*/
    function duration(minetsAndSeconds) {
        const time = Math.floor(minetsAndSeconds / 1000);
        const minutes = Math.floor(time / 60);
        const seconds = time % 60;
        let duratin = minutes + " минут " + seconds + " секунд";
        return duratin;
    }
    /*Функция перевода даты в формат дд.мм.гггг-чч:мм:сс*/
    function newDate(data) {
        if (typeof data == "string") {
            data = parseInt(data);
        }
        const date = new Date(data);
        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = String(date.getFullYear());
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        const seconds = String(date.getSeconds()).padStart(2, "0");
        const formattedDate = `${day}.${month}.${year}-${hours}:${minutes}:${seconds}`;
        return formattedDate;
    }
    /*Функция прослушивания звонков*/
    function listenCall(item) {
        let phoneNumber = item.phone;
        let formattedPhoneNumber = phoneNumber.replace("+", "");
        console.log(formattedPhoneNumber);
        getManagersTelefony(
            `get_record&date=${item.startDate}&user_id=${item.abonent_id}&phone=${formattedPhoneNumber}`
        ).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                setUrl(response.url);
            }
        });
    }
    /*Функция скачивания звонков*/
    function downLoadCall(item) {
        let phoneNumber = item.phone;
        let formattedPhoneNumber = phoneNumber.replace("+", "");
        getManagersTelefony(
            `get_record&date=${item.startDate}&user_id=${item.abonent_id}&phone=${formattedPhoneNumber}`
        ).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                const downloadWindow = window.open(response.url);
                downloadWindow.focus();
            }
        });
    }
    /*Сегодняшняя дата*/
    const date = new Date();
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const year = date.getFullYear();
    let today = `${day}.${month}.${year}`;

    return (
        <div>
            {currentClient ? (
                <ClientCard
                    currentClient={currentClient}
                    setCurrentClient={setCurrentClient}
                />
            ) : (
                <></>
            )}
            <div className="container__header">
                <Select
                    onChange={filtrManagersTelefony}
                    setId="managersTelefonyId"
                    options={managers}
                    name="Менеджер"
                    style="input__M"
                />
                <Input
                    value={today}
                    setId="dateStartTelefonyId"
                    Date="Date"
                    name="Дата звонков с"
                    style="input__S"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrManagersTelefony();
                        }
                    }}
                />
                <Input
                    setId="dateEndTelefonyId"
                    Date="Date"
                    name="Дата звонков по"
                    style="input__M"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            filtrManagersTelefony();
                        }
                    }}
                />
                <Input
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск по звонкам"
                    style="input__L"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
                <Link to="/TelefonyStatistic">
                    <Button style="button_green input__S" name="Статистика" />
                </Link>
            </div>
            <div
                onScroll={(e) => {
                    scrollHandler(e);
                }}
                className="container__table_telefony"
            >
                <h2 className="heading ">Звонки</h2>
                <table className="table">
                    <thead className="table_thead">
                        <tr>
                            <th>Дата и Время</th>
                            <th>Менеджер</th>
                            <th>Тип вызова</th>
                            <th>Телефон</th>
                            <th>Клиент</th>
                            <th>Длительность</th>
                            <th>Статус</th>
                            <th>Запись</th>
                        </tr>
                    </thead>
                    {!telefony ? (
                        <Loader />
                    ) : (
                        <tbody>
                            {telefony ? (
                                telefony.map((call) => (
                                    <tr className="trTableSales">
                                        <td>{newDate(call.startDate)}</td>
                                        <td>{call.abonent}</td>
                                        <td>
                                            {call.direction === "OUTBOUND"
                                                ? "Исходящий"
                                                : "Входящий"}
                                        </td>
                                        <td>{call.phone}</td>
                                        <td>
                                            {call.clients.map((i) => (
                                                <Link
                                                    style={{
                                                        textDecoration: "none",
                                                    }}
                                                >
                                                    <div
                                                        className="current__client"
                                                        onClick={() => {
                                                            getCurrentClient(
                                                                i.id
                                                            ).then(
                                                                (response) => {
                                                                    setCurrentClient(
                                                                        response
                                                                    );
                                                                }
                                                            );
                                                        }}
                                                    >
                                                        {i.full_name}
                                                    </div>
                                                </Link>
                                            ))}
                                        </td>
                                        <td>{duration(call.duration)}</td>
                                        <td>
                                            {call.status === "PLACED" ? (
                                                "Сделан"
                                            ) : call.status === "RECIEVED" ? (
                                                "Принят"
                                            ) : call.status === "MISSED" ? (
                                                "Пропущен"
                                            ) : call.status === "REDIRECTED" ? (
                                                "Переадресован"
                                            ) : (
                                                <></>
                                            )}
                                        </td>
                                        <td>
                                            <div
                                                style={{
                                                    fontSize: "18px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent:
                                                        "space-around",
                                                }}
                                            >
                                                <div
                                                    onClick={() => {
                                                        listenCall(call);
                                                    }}
                                                    className={
                                                        call.status == "MISSED"
                                                            ? "content__reazon_opacity"
                                                            : "listenDiv"
                                                    }
                                                >
                                                    <ion-icon name="megaphone-outline"></ion-icon>
                                                </div>

                                                <div
                                                    onClick={() => {
                                                        downLoadCall(call);
                                                    }}
                                                    className={
                                                        call.status == "MISSED"
                                                            ? "content__reazon_opacity"
                                                            : "downloadDiv"
                                                    }
                                                >
                                                    <ion-icon name="download-outline"></ion-icon>
                                                </div>
                                            </div>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <></>
                            )}
                        </tbody>
                    )}
                </table>
            </div>
            {url ? <PopUpTelefony url={url} setUrl={setUrl} /> : <></>}
        </div>
    );
}
export { Telefhony };
