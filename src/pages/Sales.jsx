import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Table } from "../components/Elements/Table";
import {
    getChannels,
    getCompanies,
    getManagers,
    getTypiesPolicies,
    oneForAll,
    oneForAllPost,
    getActSales,
} from "../Api";
import { CustomContext } from "../components/Service/Context";
import { PopUpRedactorSales } from "../components/Sales/PopUpRedactorSales";
import { PopUpNewDeal } from "../components/Dashboard/PopUpNewDeal";
import { PopUpActs } from "../components/Sales/PopUpActs";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Sales() {
    const [policies, setPolicies] = useState([]);
    const [acts, setActs] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [channel, setChannel] = useState([]);
    const [insCompany, setInsCompany] = useState([]);
    const [managers, setManagers] = useState();
    const [currentPagePolicy, setCurrentPagePolicy] = useState();
    const [loading, setLoading] = useState(false);
    const { admin } = useContext(CustomContext);
    const [loader, setLoader] = useState(false);
    const [dateValid, setDateValid] = useState(true);
    const [currentSales, setCurrentSales] = useState();
    const [showPopUp, setShowPopUp] = useState(false);
    const [showActs, setShowActs] = useState(false);
    const values =
        "accept_display,status_display,type__name,number,company__name,channel__name,commission,commission_discont,commission_rur,client__full_name,user__full_name,date_registration,date_start,date_end,sale_report__name,id,half_com_display";
    let policiesHeaderArray = [
        "Статус",
        "Тип продажи",
        "Тип полиса",
        "Серия и номер",
        "Компания",
        "Канал продаж",
        "Премия",
        "Вход. КВ %",
        "Вход. КВ руб.",
        "Клиент",
        "Менеджер",
        "Оформлен",
        "Начало действия",
        "Окончание действия",
        "Акт",
        "ID",
        "50% КВ",
    ];
    const statusSelectSels = [
        { id: "all", name: "Все" },
        { id: "true", name: "Проведён" },
    ];
    /*Сегодняшняя дата*/
    /*Дата через месяц*/
    let today = new Date();
    today.setDate(1);
    let now = today.toLocaleDateString("ru-RU");
    let nextMonth = new Date(today.setMonth(today.getMonth() + 1));
    let month = nextMonth.toLocaleDateString("ru-RU");
    /*Функция скроллинга для таблицы продаж*/
    let prevScrollTop = 0;
    const scrollHandler = (
        e,
        currentPagePolicy,
        setCurrentPagePolicy,
        loading,
        setLoading,
        setPolicies
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPagePolicy &&
            !loading
        ) {
            setLoading(true);
            let next = currentPagePolicy;
            oneForAll(undefined, undefined, next, undefined).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setPolicies((prevState) => [...prevState, ...data.results]);
                    if (data.next_page) {
                        setCurrentPagePolicy(data.next_page);
                    } else {
                        setCurrentPagePolicy();
                    }
                    setLoading(false);
                }
            });
        }
    };
    /*Фильтрация продаж по селектам*/
    function filtrSelects() {
        if (!dateValid) {
            return;
        }
        setLoader(true);
        let typeValue = document.getElementById("typeSelectSels");
        let channelValue = document.getElementById("channelSelectSels");
        let insCompanyValue = document.getElementById("insCompanySelectSels");
        let managerValue = document.getElementById("managerSelectSels");
        let statusValue = document.getElementById("statusSelectSels");
        let dataStartValue = document.getElementById("inputDateStartSels");
        let dataEndValue = document.getElementById("inputDateEndSels");
        let checkbox = document.getElementById("checkBoxSales");
        let actValue = document.getElementById("actsId");
        let link = "";
        if (actValue && actValue.value != "") {
            link = link + `sale_report=${actValue.value}`;
        } else {
            if (typeValue && typeValue.value != "") {
                link = link + `&type=${typeValue.value}`;
            }
            if (channelValue && channelValue.value != "") {
                link = link + `&channel=${channelValue.value}`;
            }
            if (insCompanyValue && insCompanyValue.value != "") {
                link = link + `&company=${insCompanyValue.value}`;
            }
            if (managerValue && managerValue.value != "") {
                link = link + `&user=${managerValue.value}`;
            }
            if (statusValue && statusValue.value != "all") {
                link = link + `&accept=${statusValue.value}`;
            }
            if (
                dataStartValue &&
                dataStartValue.value != "" &&
                dateValid == true
            ) {
                link = link + `&date_start=${dataStartValue.value}`;
            }
            if (dataEndValue && dataEndValue.value != "" && dateValid == true) {
                link = link + `&data_end=${dataEndValue.value}`;
            }
            if (checkbox) {
                if (checkbox.checked) {
                    let value = checkbox.value;
                    link = link + `&f=${value}`;
                }
            }
            if (link != "") {
                link = link.slice(1);
            }
        }
        oneForAll(values, "policy", undefined, link).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setPolicies(data.results);
                if (data.next_page) {
                    setCurrentPagePolicy(data.next_page);
                } else {
                    setCurrentPagePolicy();
                }
                setLoader(false);
            }
        });
    }
    useEffect(() => {
        getTypiesPolicies().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setTypePolicies(data);
            }
        });
        getActSales().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setActs(data);
            }
        });
        getCompanies().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setInsCompany(data);
            }
        });
        getChannels().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setChannel(data);
            }
        });
        filtrSelects();
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[3].classList.add("hovered");
    }, []);
    useEffect(() => {
        if (admin) {
            getManagers().then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setManagers(data);
                }
            });
        }
    }, [admin]);
    if (managers) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }
    /*Поиск по Sels
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrSelects();
            return;
        }
        e.target.value = search;
        oneForAll(values, "policy", undefined, `search=${search}`).then(
            (response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    setPolicies(response.results);
                    setLoader(false);
                }
            }
        );
    }
    /*Отрисовка popUp добавления полиса*/
    function addPolicy() {
        setShowPopUp(true);
    }
    /*Функция для выгрузки*/
    function unloadPolicy() {
        let typeValue = document.getElementById("typeSelectSels");
        let channelValue = document.getElementById("channelSelectSels");
        let insCompanyValue = document.getElementById("insCompanySelectSels");
        let managerValue = document.getElementById("managerSelectSels");
        let statusValue = document.getElementById("statusSelectSels");
        let dataStartValue = document.getElementById("inputDateStartSels");
        let dataEndValue = document.getElementById("inputDateEndSels");
        let checkbox = document.getElementById("checkBoxSales");
        let searchSale = document.getElementById("searchSale");
        let actValue = document.getElementById("actsId");
        let body = { upload: "policy" };
        if (searchSale && searchSale.value !== "") {
            body["search"] = searchSale.value;
        } else {
            if (actValue && actValue.value !== "") {
                body["sale_report"] = actValue.value;
            } else {
                if (typeValue && typeValue.value !== "") {
                    body["type"] = typeValue.value;
                }
                if (channelValue && channelValue.value !== "") {
                    body["channel"] = channelValue.value;
                }
                if (insCompanyValue && insCompanyValue.value !== "") {
                    body["company"] = insCompanyValue.value;
                }
                if (managerValue && managerValue.value !== "") {
                    body["user"] = managerValue.value;
                }
                if (statusValue && statusValue.value !== "all") {
                    body["accept"] = statusValue.value;
                }
                if (
                    dataStartValue &&
                    dataStartValue.value !== "" &&
                    dateValid == true
                ) {
                    body["date_start"] = dataStartValue.value;
                }
                if (
                    dataEndValue &&
                    dataEndValue.value !== "" &&
                    dateValid == true
                ) {
                    body["date_end"] = dataEndValue.value;
                }
                if (checkbox) {
                    if (checkbox.checked) {
                        body["f"] = checkbox.value;
                    }
                }
            }
        }
        oneForAllPost(body).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                const url = window.URL.createObjectURL(data);
                const link = document.createElement("a");
                link.href = url;
                link.setAttribute("download", "policy.xlsx");
                document.body.appendChild(link);
                link.click();
                document.body.removeChild(link);
            }
        });
    }
    /*Отрисовка popUp актов*/
    function openPopUpActs() {
        setShowActs(true);
    }
    /*Функция клика по строке таблицы и получения конкретной продажи*/
    function showSales(item) {
        setCurrentSales(item);
    }
    return (
        <>
            {currentSales ? (
                <PopUpRedactorSales
                    typePolicies={typePolicies}
                    setTypePolicies={setTypePolicies}
                    channel={channel}
                    insCompany={insCompany}
                    managers={managers}
                    currentSales={currentSales}
                    setCurrentSales={setCurrentSales}
                />
            ) : (
                <></>
            )}
            <div className="main" id="main">
                {showPopUp === true ? (
                    <PopUpNewDeal
                        showPopUp={showPopUp}
                        setShowPopUp={setShowPopUp}
                    />
                ) : (
                    <></>
                )}
                {showActs === true ? (
                    <PopUpActs
                        month={month}
                        now={now}
                        channel={channel}
                        insCompany={insCompany}
                        typePolicies={typePolicies}
                        policies={policies}
                        setShowActs={setShowActs}
                    />
                ) : (
                    <></>
                )}
                <div className="container__header_sales">
                    <Button onClick={addPolicy} name="Добавить полис" />
                    {admin ? (
                        <Button onClick={openPopUpActs} name="Создать АКТ" />
                    ) : (
                        <></>
                    )}
                    {admin ? (
                        <Button onClick={unloadPolicy} name="Выгрузить" />
                    ) : (
                        <></>
                    )}
                </div>
                <div className="container__header_sales">
                    <Select
                        onChange={filtrSelects}
                        setId="typeSelectSels"
                        options={typePolicies}
                        name="Тип полиса"
                        style="input__M"
                    />
                    <Select
                        onChange={filtrSelects}
                        setId="channelSelectSels"
                        options={channel}
                        name="Канал продаж"
                        style="input__L"
                    />
                    <Select
                        onChange={filtrSelects}
                        setId="insCompanySelectSels"
                        options={insCompany}
                        name="Страховая компания"
                        style="input__XL"
                    />
                    {admin ? (
                        <Select
                            onChange={filtrSelects}
                            setId="managerSelectSels"
                            options={managers}
                            name="Менеджер"
                            style="input__M"
                        />
                    ) : (
                        <></>
                    )}
                    {admin ? (
                        <div className="center">
                            <input
                                onChange={filtrSelects}
                                id="checkBoxSales"
                                type="checkbox"
                                name=""
                            />
                            <label id="labelCheckBox">50%КВ</label>
                        </div>
                    ) : (
                        <></>
                    )}
                </div>
                <div className="container__header_sales">
                    <Input
                        setId="inputDateStartSels"
                        Date="Date"
                        style="input__M"
                        name="Дата оформления с"
                        value={now}
                        onBlur={filtrSelects}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                filtrSelects();
                            }
                        }}
                    />
                    <Input
                        setId="inputDateEndSels"
                        Date="Date"
                        style="input__M"
                        name="Дата оформления по"
                        value={month}
                        onBlur={filtrSelects}
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                filtrSelects();
                            }
                        }}
                    />
                    {admin ? (
                        <Select
                            first="Сверка"
                            firstValue="false"
                            onChange={filtrSelects}
                            setId="statusSelectSels"
                            options={statusSelectSels}
                            name="Статус"
                            style="input__S"
                        />
                    ) : (
                        <></>
                    )}
                    {admin ? (
                        <Select
                            setId="actsId"
                            options={acts}
                            name="Акты"
                            style="input__XS"
                            onChange={filtrSelects}
                        />
                    ) : (
                        <></>
                    )}
                    <Input
                        setId="searchSale"
                        logo={<ion-icon name="search-outline"></ion-icon>}
                        name="Поиск по полисам"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                Search(e);
                            }
                        }}
                    />
                </div>
                <div>
                    <Table
                        loader={loader}
                        header={policiesHeaderArray}
                        props={policies}
                        title="Продажи"
                        style="container__table_tops"
                        scrollHandler={scrollHandler}
                        currentPage={currentPagePolicy}
                        setCurrentPage={setCurrentPagePolicy}
                        loading={loading}
                        setLoading={setLoading}
                        setData={setPolicies}
                        onClick={showSales}
                        heading__new="heading__new"
                    />
                </div>
            </div>
        </>
    );
}
export { Sales };
