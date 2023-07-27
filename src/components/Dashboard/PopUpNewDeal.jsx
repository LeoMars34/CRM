import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { useEffect, useState } from "react";
import { InfoPopUp } from "../Service/InfoPopUp";
import { Select } from "../Elements/Select";
import { InputFile } from "../Elements/InputFile";
import {
    addPolicy,
    getBanks,
    getChannelsCompany,
    getCompaniesL,
    getTypiesPolicies,
} from "../../Api";

function PopUpNewDeal({ currentDeal, showPopUp, setShowPopUp }) {
    const [banks, setBanks] = useState([]);
    const [channel, setChannel] = useState([]);
    const [typePolicies, setTypePolicies] = useState();
    const [companiesL, setCompaniesL] = useState([]);
    let input_labels = document.querySelectorAll(
        ".content__NewPopUp_inputFile"
    );
    let namesForFile = {
        review: "Отзыв",
        policy: "Полис",
        check: "Чек",
        zaya: "Заявление",
        passport: "Паспорт",
        pts: "ПТС",
        sts: "СТС",
        prava: "Права",
        ocenka: "Оценка",
        egrn: "ЕГРН",
        creditn: "Кредитный",
    };
    /*Наполнение статичных select*/
    let selectOptionsPay = [
        { id: "cash", name: "Наличные" },
        { id: "no_cash", name: "Безналичный" },
    ];
    let selectOptionsCreditVehicle = [
        { id: "Yes", name: "Да" },
        { id: "No", name: "Нет" },
    ];
    let selectOptionsTypeSales = [
        { id: "newbiz", name: "Новый бизнес" },
        { id: "prolongation", name: "Пролонгация" },
        { id: "transition", name: "Переход" },
        { id: "addendum", name: "Аддендум" },
        { id: "payment", name: "Очередной взнос" },
    ];
    let namesForFiles = [
        { review: "Отзыв" },
        { policy: "Полис" },
        { check: "Чек" },
        { zaya: "Заявление" },
        { passport: "Паспорт" },
        { pts: "ПТС" },
        { sts: "СТС" },
        { prava: "Права" },
        { ocenka: "Оценка" },
        { egrn: "ЕГРН" },
        { creditn: "Кредитный" },
    ];
    let inputFileArray = {
        ОСАГО: {
            requared: ["policy", "review"],
            options: ["pts", "sts", "check", "passport", "prava"],
        },
        КАСКО: {
            requared: ["policy", "zaya", "review"],
            options: ["pts", "sts", "passport", "prava"],
        },
        Ипотечный: {
            requared: ["policy", "check", "review"],
            options: ["passport", "ocenka", "egrn", "creditn"],
        },
        Else: {
            requared: ["policy", "review"],
            options: ["zaya", "check"],
        },
    };
    // let namesForFiles = [
    //     { review: "Отзыв" },
    //     { policy: "Полис" },
    //     { check: "Чек" },
    //     { zaya: "Заявление" },
    //     { passport: "Паспорт" },
    //     { pts: "ПТС" },
    //     { sts: "СТС" },
    //     { prava: "Права" },
    //     { ocenka: "Оценка" },
    //     { egrn: "ЕГРН" },
    //     { creditn: "Кредитный" },
    // ];
    useEffect(() => {
        getTypiesPolicies().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setTypePolicies(data);
            }
        });
        getCompaniesL().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setCompaniesL(data);
            }
        });
        getBanks().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setBanks(data);
            }
        });
        for (let i = 0; i < input_labels.length; i++) {
            input_labels[i].onchange = (e) => {
                let text = `${"Выбранно"} ${e.target.files.length}шт.  <br>`;
                for (let j = 0; j < e.target.files.length; j++) {
                    text = text + "- " + e.target.files[j].name + "<br>";
                }
                e.target.nextElementSibling.innerHTML = text;
                e.target.nextElementSibling.classList.remove("requared");
                e.target.nextElementSibling.classList.add("fullInput");
            };
        }
        if (document.querySelector(".toggleNewBtn")) {
            if (showPopUp === true) {
                document.querySelector(".toggleNewBtn").onclick = () => {
                    setShowPopUp(false);
                };
            }
        }
        /*Удаление двойных пробелов*/
        document.querySelectorAll(".input__XL").forEach((item) => {
            item.oninput = (e) => {
                e.target.value = e.target.value.replace(/\s+/g, " ");
            };
        });
        /*Удаление пробелов в начале и конце строки*/
        document.querySelectorAll(".input__XL").forEach((item) => {
            item.onchange = (e) => {
                e.target.value = e.target.value.trim();
            };
        });
        /*Установка select по умолчанию*/
        document.getElementById("payId").selectedIndex = 2;
        document.getElementById("creditVehicleId").selectedIndex = 2;
        document.getElementById("kvBnakId").value = 0;
        document.getElementById("insurancePremiumId").value = 0;
        document.getElementById("incomingCommissionId").value = 0;
        document.getElementById("discountCV").value = 0;
    }, []);
    /*Подсветка незаполненных полей и создание нового полиса*/
    function handleClick() {
        document.querySelectorAll(".requared select").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ",
                    "popup__Info_red"
                );
                return;
            }
        });
        document.querySelectorAll(".requared input").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ",
                    "popup__Info_red"
                );
                return;
            }
        });
        let formData = new FormData();
        formData.append("type_pay", document.getElementById("payId").value);
        formData.append("status", document.getElementById("typeSalesId").value);
        formData.append("type_policy", document.getElementById("typeId").value);
        formData.append(
            "commission",
            document.getElementById("incomingCommissionId").value
        );
        formData.append("bank", document.getElementById("bankId").value);
        formData.append("series", document.getElementById("seriesId").value);
        formData.append("number", document.getElementById("numberId").value);
        formData.append(
            "credit",
            document.getElementById("creditVehicleId").value
        );
        formData.append(
            "bank_commission",
            document.getElementById("kvBnakId").value
        );
        formData.append(
            "sp",
            document.getElementById("insurancePremiumId").value
        );
        formData.append("company", document.getElementById("companyId").value);
        formData.append("channel", document.getElementById("channelId").value);
        formData.append(
            "commission_discont",
            document.getElementById("discountCV").value
        );
        formData.append(
            "date_registration",
            document.getElementById("dataRegistrationId").value
        );
        formData.append("date_start", document.getElementById("dateNow").value);
        formData.append(
            "date_end",
            document.getElementById("datePlusYear").value
        );
        formData.append(
            "full_name",
            document.getElementById("full_nameId").value
        );
        formData.append(
            "birthday",
            document.getElementById("birthdayId").value
        );
        formData.append("email", document.getElementById("emailId").value);
        formData.append("phone", document.getElementById("phoneId").value);
        formData.append("address", document.getElementById("addressId").value);
        let input_files = document.querySelectorAll(
            ".input-file__input > input"
        );
        input_files.forEach((item) => {
            if (item.files.length > 0) {
                for (let i = 0; i < item.files.length; i++) {
                    formData.append(
                        `${namesForFile[item.id]}_${i}_${item.files[i].name}`,
                        item.files[i]
                    );
                }
            }
        });
        addPolicy(formData).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Валидация на ввод трёх заглавных русских букв*/
    function validateInputSeries() {
        let selectTypePolicy = document.getElementById("typeId");
        if (
            selectTypePolicy[selectTypePolicy.selectedIndex].textContent ==
            "ОСАГО"
        ) {
            let inputField = document.getElementById("seriesId");
            let regex = /[^А-Я]/g;
            let isValidInput = regex.test(inputField.value);
            if (isValidInput) {
                inputField.value = inputField.value.replace(regex, "");
                InfoPopUp(
                    "ВВЕДИТЕ ТРИ ЗАГЛАВНЫЕ РУССКИЕ БУКВЫ",
                    "popup__Info_red"
                );
            }
            if (inputField.value.length > 3) {
                inputField.value = inputField.value.slice(0, 3);
            }
        }
    }
    /*Сегодняшняя дата*/
    let today = new Date();
    let now = today.toLocaleDateString("ru-RU");
    /*Дата через год*/
    function addYear() {
        const dateInput = document.getElementById("dateNow").value;
        const dateWithYearInput = document.getElementById("datePlusYear");
        let newDateInput = dateInput.split(".").reverse();
        const date = new Date(newDateInput);
        const newDate = new Date(date.getTime() + 364 * 24 * 60 * 60 * 1000);
        const options = { year: "numeric", month: "numeric", day: "numeric" };
        const ruDate = newDate.toLocaleString("ru-RU", options);
        dateWithYearInput.value = ruDate;
    }
    /*Снятие disabled с канала продаж*/
    function channelUndisable() {
        let id = document.getElementById("companyId").value;
        console.log(id);
        getChannelsCompany(id).then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setChannel(data);
            }
        });
        document.getElementById("channelId").disabled = false;
    }
    /*Сперва выберите компанию*/
    function channelInfo() {
        if (document.getElementById("companyId").value != "") {
            return;
        } else {
            InfoPopUp("СПЕРВА ВЫБЕРИТЕ КОМПАНИЮ", "popup__Info_red");
        }
    }
    /*Снятие display none с select кв банк*/
    function selectKvBank() {
        const creditVehicleId = document.getElementById("creditVehicleId");
        if (
            creditVehicleId[creditVehicleId.selectedIndex].textContent == "Да"
        ) {
            document.getElementById("divKvBankId").classList.remove("none");
        } else {
            document.getElementById("divKvBankId").classList.add("none");
            document.getElementById("kvBnakId").value = 0;
        }
    }
    /*Всё что связано с изменением типа полиса*/
    /*Добавление input file и классов для них*/
    function selectType() {
        const selectBank = document.getElementById("bankId");
        const selectType = document.getElementById("typeId");
        if (selectType[selectType.selectedIndex].textContent == "КАСКО") {
            document
                .getElementById("divCreditVehicleIdId")
                .classList.remove("none");
            document.getElementById("creditVehicleId").selectedIndex = 2;
        } else {
            document
                .getElementById("divCreditVehicleIdId")
                .classList.add("none");
            document.getElementById("divKvBankId").classList.add("none");
            document.getElementById("kvBnakId").value = 0;
            document.getElementById("creditVehicleId").value = "Нет";
        }
        if (selectType[selectType.selectedIndex].textContent == "Ипотечный") {
            document.getElementById("divBankId").classList.remove("none");
            document
                .getElementById("divIncomingCommissionId")
                .classList.remove("none");
        } else {
            document.getElementById("divBankId").classList.add("none");
            document
                .getElementById("divIncomingCommissionId")
                .classList.add("none");
            document.getElementById("incomingCommissionId").value = "";
        }
        if (selectType[selectType.selectedIndex].textContent == "Личные вещи") {
            document.getElementById("seriesId").value = "SLV";
            document.getElementById("divSeriesId").classList.add("requared");
        } else {
            document.getElementById("seriesId").value = "";
        }
        if (selectType[selectType.selectedIndex].textContent == "ОСАГО") {
            document.getElementById("seriesId").value = "XXX";
            document.getElementById("divSeriesId").classList.add("requared");
        }
        namesForFiles.map((item) => {
            document
                .getElementById(Object.keys(item)[0])
                .parentNode.classList.add("none");
            document
                .getElementById(Object.keys(item)[0])
                .nextElementSibling.classList.remove("requared");
            document
                .getElementById(Object.keys(item)[0])
                .nextElementSibling.classList.remove("fullInput");
            document.getElementById(
                Object.keys(item)[0]
            ).nextElementSibling.innerHTML = ` <i>
            <ion-icon name="cloud-upload-outline"></ion-icon>
        </i> ${Object.values(item)[0]}`;
        });
        if (
            selectType[selectType.selectedIndex].textContent in inputFileArray
        ) {
            inputFileArray[
                selectType[selectType.selectedIndex].textContent
            ].requared.map((name) => {
                document
                    .getElementById(name)
                    .nextElementSibling.classList.add("requared");
                document
                    .getElementById(name)
                    .parentNode.classList.remove("none");
            });
            inputFileArray[
                selectType[selectType.selectedIndex].textContent
            ].options.map((name) => {
                document
                    .getElementById(name)
                    .parentNode.classList.remove("none");
            });
        } else {
            inputFileArray["Else"].requared.map((item) => {
                document
                    .getElementById(item)
                    .nextElementSibling.classList.add("requared");
                document
                    .getElementById(item)
                    .parentNode.classList.remove("none");
            });
            inputFileArray["Else"].options.map((item) => {
                document
                    .getElementById(item)
                    .parentNode.classList.remove("none");
            });
        }
    }
    /*Функция выбора канала продаж*/
    function selectChannel() {
        let selectChannel = document.getElementById("channelId");
        let selectType = document.getElementById("typeId");
        if (
            selectType[selectType.selectedIndex].textContent == "ОСАГО" &&
            selectChannel[selectChannel.selectedIndex].textContent == "Пампаду"
        ) {
            document
                .getElementById("divIncomingCommissionId")
                .classList.remove("none");
            document.getElementById("incomingCommissionId").value = 0;
        } else if (
            selectType[selectType.selectedIndex].textContent == "ОСАГО" &&
            selectChannel[selectChannel.selectedIndex].textContent ==
                'ООО "НЭП"'
        ) {
            document
                .getElementById("divIncomingCommissionId")
                .classList.remove("none");
            document.getElementById("incomingCommissionId").value = 0;
        } else {
            document
                .getElementById("divIncomingCommissionId")
                .classList.add("none");
            document.getElementById("incomingCommissionId").value = "";
        }
    }
    function closePopUp(e) {
        if (!e.target.closest(".content__PopUp_Deal")) {
            setShowPopUp();
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_Deal">
                <div className="content__NewPopUp_container">
                    <Select
                        setId="payId"
                        name="Оплата"
                        style="input__XL requared"
                        options={selectOptionsPay}
                    />
                    <Select
                        name="Тип продажи"
                        style="input__XL requared"
                        options={selectOptionsTypeSales}
                        setId="typeSalesId"
                    />
                    <Select
                        setId="typeId"
                        name="Тип полиса"
                        style="input__XL requared"
                        options={typePolicies}
                        onChange={selectType}
                    />
                    <Select
                        divId="divBankId"
                        setId="bankId"
                        name="Банк"
                        options={banks}
                        style="input__XL none"
                    />
                    <Input
                        divId="divIncomingCommissionId"
                        setId="incomingCommissionId"
                        name="Входящая комиссия"
                        type="number"
                        step="0.1"
                        style="none"
                    />
                    <Select
                        divId="divCreditVehicleIdId"
                        name="Кредитная ТС"
                        style="input__XL none"
                        setId="creditVehicleId"
                        options={selectOptionsCreditVehicle}
                        onChange={selectKvBank}
                    />
                    <Input
                        setId="kvBnakId"
                        divId="divKvBankId"
                        name="КВ Банк"
                        type="number"
                        step="0.1"
                        style="input__XL none"
                    />
                    <Input
                        divId="divSeriesId"
                        onInput={validateInputSeries}
                        setId="seriesId"
                        name="Серия"
                    />
                    <Input setId="numberId" name="Номер" style="requared" />
                    <Input
                        setId="insurancePremiumId"
                        name="Страховая премия"
                        type="number"
                        step="0.1"
                        style="requared"
                    />
                    <Select
                        setId="companyId"
                        name="Компания"
                        style="input__XL requared"
                        onChange={channelUndisable}
                        options={companiesL}
                    />
                    <Select
                        setId="channelId"
                        name="Канал продаж"
                        style="input__XL requared"
                        disabled="true"
                        onClick={channelInfo}
                        options={channel}
                        onChange={selectChannel}
                    />
                    <Input
                        setId="discountCV"
                        name="Скидка с КВ"
                        type="number"
                        step="0.1"
                        style="requared"
                    />
                    <Input
                        setId="dataRegistrationId"
                        name="Дата оформления"
                        value={now}
                        style="requared"
                        Date="Date"
                    />
                    <Input
                        name="Дата начала действия полиса"
                        style="requared"
                        Date="Date"
                        onBlur={addYear}
                        setId="dateNow"
                    />
                    <Input
                        name="Дата окончания полиса"
                        style="requared"
                        Date="Date"
                        setId="datePlusYear"
                    />
                </div>
                <div className="content__NewPopUp_inputFile">
                    {namesForFiles.map((item) => (
                        <InputFile
                            setId={Object.keys(item)[0]}
                            name={Object.values(item)[0]}
                            style="input-file__input none"
                        />
                    ))}
                </div>
                <div style={{ textAlign: "center" }} className="clientInfa">
                    <h3>
                        Страхователь
                        <ion-icon name="person-outline"></ion-icon>
                    </h3>
                    <Input
                        setId="full_nameId"
                        style="requared"
                        value={
                            currentDeal
                                ? currentDeal.policy.policyholder.full_name
                                : ""
                        }
                        name="ФИО"
                        Fio="Fio"
                    />
                    <Input
                        divId="divBirthdayId"
                        setId="birthdayId"
                        value={
                            currentDeal
                                ? currentDeal.policy.policyholder.birthday
                                : ""
                        }
                        style="requared"
                        name="Дата Рождения"
                        Birthday="Birthday"
                    />
                    <Input
                        divId="divPhoneId"
                        setId="phoneId"
                        value={
                            currentDeal
                                ? currentDeal.policy.policyholder.phone
                                : ""
                        }
                        style="requared"
                        name="Телефон"
                        Phone="Phone"
                    />
                    <Input
                        divId="divMailCreateDeal"
                        Email="Email"
                        setId="emailId"
                        value={
                            currentDeal
                                ? currentDeal.policy.policyholder.email
                                : ""
                        }
                        name="Почта"
                    />
                    <Input
                        setId="addressId"
                        value={
                            currentDeal
                                ? currentDeal.policy.policyholder.address
                                : ""
                        }
                        name="Адресс"
                    />
                </div>
                <div className="container__PopUp_Tools">
                    <Button
                        onClick={handleClick}
                        style="button_green"
                        name="Сохранить"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpNewDeal };
