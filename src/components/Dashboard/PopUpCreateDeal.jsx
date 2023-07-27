import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { useContext, useEffect, useState } from "react";
import { CustomContext } from "../Service/Context";
import { Button } from "../Elements/Button";
import { getBaseSource, createDeals, getDeals } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpCreateDeal({
    typePolicies,
    stages,
    managers,
    setDeals,
    setCurrentDeal,
    banks,
    insObjectRisk,
    setCreateDeal,
}) {
    const [baseSource, setBaseSource] = useState([]);
    const admin = useContext(CustomContext);
    const insObject = [
        { id: "car", name: "МАШИНА" },
        { id: "ipoteca", name: "ИПОТЕКА" },
    ];
    let optionsStage = [];
    useEffect(() => {
        getBaseSource().then((list) => {
            setBaseSource(list.results);
        });
    }, []);
    /*Функция наполнения массива этапов*/
    stages.forEach((element) => {
        optionsStage.push(element.stage);
    });
    /*Подсветка обязательных для заполнения полей и создание сделки*/
    function handleClick(e) {
        const popUp = e.target.closest(".main__container");
        popUp
            .querySelectorAll(".requared select, .requared input")
            .forEach((item) => {
                if (item.value == "") {
                    item.classList.add("red_border");
                } else {
                    item.classList.remove("red_border");
                }
            });
        if (popUp.querySelectorAll(".red_border").length > 0) {
            InfoPopUp("ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ", "popup__Info_red");
            return;
        } else {
            let basesource_id = document.getElementById("basesource_id").value;
            let type_policy = document.getElementById("type_policy").value;
            let stage_id = document.getElementById("stage_id").value;
            let user = document.getElementById("user").value;
            let full_name = document.getElementById("full_name").value;
            let phone = document.getElementById("phoneCreateDeals").value;
            let email = document.getElementById("mailCreateDeals").value;
            let birthday = document.getElementById("dateCreateDeals").value;
            let address = document.getElementById("address").value;
            let brand = document.getElementById("brandInput").value;
            let year = document.getElementById("yearInput").value;
            let vin = document.getElementById("vinInput").value;
            let number = document.getElementById("gosNomerInput").value;
            let ipoteca = document.getElementById("ipotecaInput").value;
            let bank = document.getElementById("bankInput").value;
            let risk = document.getElementById("riskSelect").value;
            let remainder = document.getElementById("remainderInput").value;
            createDeals(
                basesource_id,
                type_policy,
                stage_id,
                user,
                full_name,
                phone,
                email,
                birthday,
                address,
                brand,
                number,
                vin,
                year,
                ipoteca,
                bank,
                risk,
                remainder
            ).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    setCurrentDeal(response);
                    getDeals(1).then((data) => {
                        if (data.error) {
                            InfoPopUp(data.error, "popup__Info_red");
                        } else {
                            setDeals(data);
                        }
                    });
                }
            });
        }
        setCreateDeal(false);
    }
    /*Функция отрисовки селектов в зависимости от выбранного*/
    function showCarObject() {
        if (document.getElementById("selectInsObject")) {
            if (document.getElementById("selectInsObject").value == "car") {
                document
                    .getElementById("brandDivInput")
                    .classList.remove("none");
                document
                    .getElementById("gosNomerDivInput")
                    .classList.remove("none");
                document.getElementById("vinDivInput").classList.remove("none");
                document
                    .getElementById("yearDivInput")
                    .classList.remove("none");
            } else {
                document.getElementById("brandDivInput").classList.add("none");
                document
                    .getElementById("gosNomerDivInput")
                    .classList.add("none");
                document.getElementById("vinDivInput").classList.add("none");
                document.getElementById("yearDivInput").classList.add("none");
            }
        }
        if (document.getElementById("selectInsObject").value == "ipoteca") {
            document.getElementById("ipotecaDivInput").classList.remove("none");
            document.getElementById("bankDivInput").classList.remove("none");
            document.getElementById("riskDivSelect").classList.remove("none");
            document
                .getElementById("remainderDivInput")
                .classList.remove("none");
        } else {
            document.getElementById("ipotecaDivInput").classList.add("none");
            document.getElementById("bankDivInput").classList.add("none");
            document.getElementById("riskDivSelect").classList.add("none");
            document.getElementById("remainderDivInput").classList.add("none");
        }
    }
    /*Функция закрытия popUp создания сделки*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setCreateDeal(false);
            }
        }
    }
    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                    Создать сделку
                </h3>
                <Select
                    setId="basesource_id"
                    style="requared"
                    name="Источник"
                    options={baseSource}
                />
                <Select
                    setId="type_policy"
                    style="requared"
                    name="Тип полиса"
                    options={typePolicies}
                />
                <Select
                    setId="stage_id"
                    style="requared"
                    options={optionsStage}
                    name="Этап"
                />
                {admin ? (
                    <Select
                        setId="user"
                        style="requared"
                        name="Менеджер"
                        options={managers}
                    />
                ) : (
                    ""
                )}
                <Input
                    setId="full_name"
                    style="input__L  requared"
                    name="ФИО клиента"
                    Fio="Fio"
                />
                <Input
                    setId="address"
                    style="input__L"
                    name="Регион прописки"
                />
                <Input
                    setId="phoneCreateDeals"
                    divId="divPhoneCreateDeals"
                    style="input__L requared"
                    name="Телефон"
                    Phone="Phone"
                />
                <Input
                    setId="mailCreateDeals"
                    divId="divMailCreateDeals"
                    style="input__L"
                    name="Почта"
                    Email="Email"
                />
                <Input
                    setId="dateCreateDeals"
                    divId="divDateCreateDeals"
                    style="input__L"
                    name="Дата Рождения"
                    Birthday="Birthday"
                />
                <Select
                    setId="selectInsObject"
                    style=""
                    name="Объект Страхования"
                    options={insObject}
                    onChange={showCarObject}
                />
                <Input
                    divId="brandDivInput"
                    setId="brandInput"
                    style="input__L  none"
                    name="Марка"
                />
                <Input
                    setId="gosNomerInput"
                    divId="gosNomerDivInput"
                    style="input__L  none"
                    name="Гос. Номер"
                />
                <Input
                    setId="vinInput"
                    divId="vinDivInput"
                    style="input__L none"
                    name="VIN"
                />
                <Input
                    setId="yearInput"
                    divId="yearDivInput"
                    style="input__L none"
                    name="Год выпуска"
                />
                <Input
                    setId="ipotecaInput"
                    divId="ipotecaDivInput"
                    style="input__L requared none"
                    name="Ипотека"
                />
                <Select
                    setId="bankInput"
                    divId="bankDivInput"
                    style="none"
                    name="Банк"
                    options={banks}
                />
                <Select
                    setId="riskSelect"
                    divId="riskDivSelect"
                    style="input__medium requared none"
                    name="Риски"
                    options={insObjectRisk}
                />
                <Input
                    setId="remainderInput"
                    divId="remainderDivInput"
                    style="input__L none"
                    name="Остаток"
                    type="number"
                    step={0.1}
                />
                <div>
                    <Button
                        style="button_green"
                        onClick={handleClick}
                        name="Создать"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpCreateDeal };
