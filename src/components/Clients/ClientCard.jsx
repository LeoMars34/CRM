import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Table } from "../Elements/Table";
import { getDeal, oneForAll } from "../../Api";
import { PopUpRedactorSales } from "../Sales/PopUpRedactorSales";
import { PopUpDeal } from "../Dashboard/PopUpDeal";
import { InfoPopUp } from "../Service/InfoPopUp";

function ClientCard({ currentClient, setCurrentClient }) {
    const [clientSale, setClientSale] = useState();
    const [currentSales, setCurrentSales] = useState();
    const [clientDeal, setClientDeal] = useState();
    const [currentDeal, setCurrentDeal] = useState();
    const [clientPolicyInBase, setClientPolicyInBase] = useState();
    const [loader, setLoader] = useState(false);
    const [deal, setDeal] = useState();
    let clientSaleHeaderArray = [
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
    let clientDealHeaderArray = ["Дата создания", "Название", "Статус"];
    let clientPolicyInBaseHeaderArray = [
        "Источник",
        "Тип полиса",
        "Компания",
        "Дата окончания",
    ];
    /*Показ таблицы продаж*/
    function showSailsTable() {
        setLoader(true);
        setClientDeal();
        setClientPolicyInBase();
        const values =
            "date_registration,type__name,company__name,channel__name,number";
        let id = currentClient.id;
        oneForAll(values, "policy", undefined, `client=${id}`).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClientSale(data.results);
            }
        });
        setLoader(false);
    }
    /*Показ таблицы сделок*/
    function showDealTable() {
        setLoader(true);
        setClientSale();
        setClientPolicyInBase();
        let id = currentClient.id;
        const values = "date_create,name,status,description,price,id";
        oneForAll(values, "deal", undefined, `client=${id}`).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClientDeal(data.results);
            }
        });
        setLoader(false);
    }
    /*Показ таблицы полисов*/
    function showPoliciesTable() {
        setLoader(true);
        setClientSale();
        setClientDeal();
        const values = "base_source,type__name,company__name,date_end";
        let id = currentClient.id;
        oneForAll(values, "base_policy", undefined, `client=${id}`).then(
            (data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                } else {
                    setClientPolicyInBase(data.results);
                }
            }
        );
        setLoader(false);
    }
    useEffect(() => {
        setLoader(true);
        setClientDeal();
        setClientPolicyInBase();
        let id = currentClient.id;
        const values =
            "accept_display,status_display,type__name,number,company__name,channel__name,commission,commission_discont,commission_rur,client__full_name,user__full_name,date_registration,date_start,date_end,sale_report__name,id,half_com_display";
        oneForAll(values, "policy", undefined, `client=${id}`).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClientSale(data.results);
            }
        });

        setLoader(false);
    }, []);
    /*Функция  клика по строке таблиц и показ конкретной сделки и продажи*/
    function showDeal(item) {
        getDeal(item.id).then((data) => {
            setDeal(data);
        });
    }
    function showSales(item) {
        setCurrentSales(item);
    }
    /*Функция закрытия popUp*/
    function closePopUp(e) {
        {
            if (
                !deal &&
                !currentSales &&
                !e.target.closest(".content__PopUp_Deal")
            ) {
                setCurrentClient();
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="main__flex">
                <div className="content__PopUp_Deal">
                    <div className="content__PopUpClientsCard_comments"></div>
                    <div className="content__PopUp_ClientCard right">
                        <Input
                            value={currentClient.full_name}
                            name="ФИО клиента"
                            Fio="Fio"
                        />
                        <Input
                            value={currentClient.birthday}
                            setId="addHappyBithday"
                            divId="divAddHappyBirthdayClient"
                            name="Дата рождения клиента"
                            Birthday="Birthday"
                        />
                        <Input
                            value={currentClient.phone}
                            divId="divAddPhoneClient"
                            setId="addPhoneClient"
                            name="Телефон клиента"
                            Phone="Phone"
                        />
                        <Input
                            value={currentClient.email}
                            divId="divAddEmailClient"
                            setId="addEmailClient"
                            name="Email Клиента"
                            Email="Email"
                        />
                        <Input
                            value={currentClient.address}
                            name="Регион клиента"
                        />
                        <Input name="Контактное лицо" Fio="Fio" />
                        <Input
                            divId="divAddPhoneClientFace"
                            setId="addPhoneClientFace"
                            name="Телефон КЛ"
                            Phone="Phone"
                        />
                        <Input
                            divId="divAddEmailClientFace"
                            setId="addEmailClientFace"
                            name="Email КЛ"
                            Email="Email"
                        />
                    </div>
                    <div className="content__PopUpClientCard_btn">
                        <Button onClick={showSailsTable} name="Продажи" />
                        <Button onClick={showDealTable} name="Сделки" />
                        <Button
                            onClick={showPoliciesTable}
                            name="Полисы в базе"
                        />
                    </div>
                    <div>
                        {clientSale ? (
                            <Table
                                onClick={showSales}
                                loader={loader}
                                title="Продажи"
                                props={clientSale}
                                header={clientSaleHeaderArray}
                                style="tableSaleClient"
                            />
                        ) : (
                            <></>
                        )}
                        {clientDeal ? (
                            <Table
                                onClick={showDeal}
                                setCurrentItem={setCurrentDeal}
                                loader={loader}
                                header={clientDealHeaderArray}
                                title="Сделки"
                                style="tableSaleClient"
                                props={clientDeal}
                            />
                        ) : (
                            <></>
                        )}
                        {clientPolicyInBase ? (
                            <Table
                                loader={loader}
                                header={clientPolicyInBaseHeaderArray}
                                title="Полисы в базе"
                                style="tableSaleClient"
                                props={clientPolicyInBase}
                            />
                        ) : (
                            <></>
                        )}
                    </div>
                </div>
            </div>
            {currentSales ? (
                <PopUpRedactorSales
                    currentSales={currentSales}
                    setCurrentSales={setCurrentSales}
                />
            ) : (
                <></>
            )}
            {deal ? (
                <PopUpDeal currentDeal={deal} setCurrentDeal={setDeal} />
            ) : (
                <></>
            )}
        </div>
    );
}
export { ClientCard };
