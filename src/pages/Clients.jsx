import { useContext, useEffect, useState } from "react";
import { Button } from "../components/Elements/Button";
import { Select } from "../components/Elements/Select";
import { Input } from "../components/Elements/Input";
import { Link } from "react-router-dom";
import { Table } from "../components/Elements/Table";
import { AddClients } from "../components/Clients/AddClients";
import { ClientCard } from "../components/Clients/ClientCard";
import {
    getChannels,
    getCompanies,
    getManagers,
    getTypiesPolicies,
    oneForAll,
    oneForAllPost,
} from "../Api";
import { CustomContext } from "../components/Service/Context";
import { InfoPopUp } from "../components/Service/InfoPopUp";

function Clients() {
    const { admin } = useContext(CustomContext);
    const [typePolicies, setTypePolicies] = useState([]);
    const [insCompany, setInsCompany] = useState([]);
    const [channel, setChannel] = useState([]);
    const [managers, setManagers] = useState([]);
    const [loader, setLoader] = useState(false);
    const [addClient, setAddClient] = useState(false);
    const [clients, setClients] = useState([]);
    const [currentPageClients, setCurrentPageClients] = useState();
    const [loading, setLoading] = useState(false);
    const [currentClient, setCurrentClient] = useState();
    const values = "full_name,phone,email,address,birthday,user__full_name,id";
    let clientsHeaderArray = [
        "ФИО",
        "Телефон",
        "Email",
        "Адресс",
        "День рождения",
        "Менеджер",
        "ID",
    ];
    /*Фильтрация клиентов по селектам*/
    function filtrClientsSelects() {
        setLoader(true);
        let insCompanyClints = document.getElementById("insCompanyClints");
        let channelClints = document.getElementById("channelClints");
        let typePoliciesClints = document.getElementById("typePoliciesClints");
        let managersClints = document.getElementById("managersClints");
        let link = "";
        if (insCompanyClints && insCompanyClints.value != "") {
            link = link + `&company=${insCompanyClints.value}`;
        }
        if (channelClints && channelClints.value != "") {
            link = link + `&channel=${channelClints.value}`;
        }
        if (typePoliciesClints && typePoliciesClints.value != "") {
            link = link + `&type=${typePoliciesClints.value}`;
        }
        if (managersClints && managersClints.value != "") {
            link = link + `&user=${managersClints.value}`;
        }
        if (link != "") {
            link = link.slice(1);
        }
        oneForAll(values, "client", undefined, link).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClients(data.results);
                if (data.next_page) {
                    setCurrentPageClients(data.next_page);
                } else {
                    setCurrentPageClients();
                }
                setLoader(false);
            }
        });
    }
    /*Функция скроллинга для таблицы клиентов*/
    let prevScrollTop = 0;
    const scrollHandler = (
        e,
        currentPageClients,
        setCurrentPageClients,
        loading,
        setLoading,
        setClients
    ) => {
        if (e.target.scrollTop === prevScrollTop) {
            return;
        }
        if (
            e.target.scrollHeight -
                (e.target.scrollTop + e.target.offsetHeight) <
                5 &&
            currentPageClients &&
            !loading
        ) {
            setLoading(true);
            let next = currentPageClients;
            oneForAll(undefined, undefined, next, undefined).then((data) => {
                setClients((prevState) => [...prevState, ...data.results]);
                if (data.next_page) {
                    setCurrentPageClients(data.next_page);
                } else {
                    setCurrentPageClients();
                }
                setLoading(false);
            });
        }
    };
    useEffect(() => {
        filtrClientsSelects();
        getTypiesPolicies().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setTypePolicies(data);
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
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[2].classList.add("hovered");
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
    if (managers.length > 0) {
        managers.forEach((user, i) => {
            managers[i]["name"] = `${user.first_name} ${user.last_name}`;
        });
    }
    /*Показать popUp создания новой сделки*/
    function showPopUpNewDeal() {
        setAddClient(true);
    }
    /*Поиск по Clients
    Удаление пробелов в начале и конце строки*/
    function Search(e) {
        setLoader(true);
        let search = e.target.value.trim().replace(/\s+/g, " ");
        if (search == "") {
            filtrClientsSelects();
            return;
        }
        e.target.value = search;
        oneForAll(values, "client", undefined, `search=${search}`).then(
            (response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    setClients(response.results);
                    setLoader(false);
                }
            }
        );
    }
    /*Выгрузка клиентов*/
    function unloadClients() {
        let body = { upload: "client" };
        let insCompanyClints = document.getElementById("insCompanyClints");
        let channelClints = document.getElementById("channelClints");
        let typePoliciesClints = document.getElementById("typePoliciesClints");
        let managersClints = document.getElementById("managersClints");
        let searchClients = document.getElementById("searchClients");
        if (searchClients && searchClients.value != "") {
            body["search"] = searchClients.value;
        } else {
            if (typePoliciesClints && typePoliciesClints.value != "") {
                body["type"] = typePoliciesClints.value;
            }
            if (channelClints && channelClints.value != "") {
                body["channel"] = channelClints.value;
            }
            if (insCompanyClints && insCompanyClints.value != "") {
                body["company"] = insCompanyClints.value;
            }
            if (managersClints && managersClints.value != "") {
                body["user"] = managersClints.value;
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
    /*Функция клика по сточке и получения конкретного клиента и его данных*/
    function showClient(item) {
        setCurrentClient(item);
    }

    return (
        <div>
            {addClient ? <AddClients setAddClient={setAddClient} /> : <></>}
            <div className="container__header">
                <Link to="/Mortage">
                    <Button name="Заявки на ипотеку" />
                </Link>
                {admin ? (
                    <Link to="/ClientsBases">
                        <Button name="Базы" />
                    </Link>
                ) : (
                    <></>
                )}
                <Select
                    style="input__S"
                    onChange={filtrClientsSelects}
                    setId="insCompanyClints"
                    options={insCompany}
                    name="Компания"
                />
                <Select
                    style="input__M"
                    onChange={filtrClientsSelects}
                    setId="channelClints"
                    options={channel}
                    name="Канал продаж"
                />
                <Select
                    style="input__S"
                    onChange={filtrClientsSelects}
                    setId="typePoliciesClints"
                    options={typePolicies}
                    name="Тип полиса"
                />
                {admin ? (
                    <Select
                        style="input__S"
                        onChange={filtrClientsSelects}
                        setId="managersClints"
                        options={managers}
                        name="Менеджер"
                    />
                ) : (
                    <></>
                )}
                <Input
                    style="input__M"
                    logo={<ion-icon name="search-outline"></ion-icon>}
                    name="Поиск клиента"
                    setId="searchClients"
                    onKeyDown={(e) => {
                        if (e.keyCode === 13) {
                            Search(e);
                        }
                    }}
                />
                <Button
                    style="button_green"
                    name="Добавить клиента"
                    onClick={showPopUpNewDeal}
                />
                {admin ? (
                    <Button onClick={unloadClients} name="Выгрузить" />
                ) : (
                    <></>
                )}
            </div>
            <div>
                <Table
                    onClick={showClient}
                    loader={loader}
                    loading={loading}
                    setLoading={setLoading}
                    currentPage={currentPageClients}
                    setCurrentPage={setCurrentPageClients}
                    scrollHandler={scrollHandler}
                    header={clientsHeaderArray}
                    props={clients}
                    title="Клиенты"
                    style="container__table_basepolicy"
                    setData={setClients}
                />
            </div>
            {currentClient ? (
                <ClientCard
                    currentClient={currentClient}
                    setCurrentClient={setCurrentClient}
                />
            ) : (
                <></>
            )}
        </div>
    );
}
export { Clients };
