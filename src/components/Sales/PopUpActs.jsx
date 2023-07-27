import { Select } from "../Elements/Select";
import { Input } from "../Elements/Input";
import { Button } from "../Elements/Button";
import { useEffect, useState } from "react";
import { addActSales, createActSales } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpActs({
    month,
    now,
    setShowActs,
    typePolicies,
    insCompany,
    channel,
}) {
    const [count, setCount] = useState([]);
    useEffect(() => {
        getCountPolisiesAndValue();
    }, []);
    function closeActs(e) {
        if (!e.target.closest(".container__Acts")) {
            setShowActs(false);
        }
    }
    /*Функция создания body для создания акта*/
    function creareFormData() {
        let formData = new FormData();
        let typePoliciesActs = document.getElementById("typePoliciesActs");
        let channelActs = document.getElementById("channelActs");
        let companiesActs = document.getElementById("companiesActs");
        let nowActs = document.getElementById("nowActs");
        let monthActs = document.getElementById("monthActs");
        if (nowActs) {
            formData.append("date_start", nowActs.value);
        }
        if (monthActs) {
            formData.append("date_end", monthActs.value);
        }
        if (typePoliciesActs && typePoliciesActs.value != "") {
            formData.append("type", typePoliciesActs.value);
        }
        if (channelActs && channelActs.value != "") {
            formData.append("channel", channelActs.value);
        }
        if (companiesActs && companiesActs.value != "") {
            formData.append("companies", companiesActs.value);
        }
        return formData;
    }
    /*Функция получения колличества актов*/
    function getCountPolisiesAndValue() {
        let formData = creareFormData();
        addActSales(formData).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                setCount(response);
            }
        });
    }
    /*Функция создания акта*/
    function createAct() {
        let nameAct = document.getElementById("nameAct");
        if (nameAct && nameAct.value != "") {
            let formData = creareFormData();
            formData.append("name", nameAct.value);
            createActSales(formData).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                }
            });
        }
    }
    return (
        <div onClick={closeActs} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <div className="container__PopUp_Tools">
                    <div className="big__logo">
                        <ion-icon name="reader-outline"></ion-icon>
                        {count.count}
                    </div>
                    <div className="big__logo">
                        <ion-icon name="cash-outline"></ion-icon>
                        {count.sum}
                    </div>
                </div>
                <div className="content__Acts">
                    <Select
                        setId="typePoliciesActs"
                        style="requared input__L"
                        name="Тип полиса"
                        options={typePolicies}
                        onChange={getCountPolisiesAndValue}
                    />
                    <Select
                        setId="channelActs"
                        options={channel}
                        style="requared input__L"
                        name="Канал продаж"
                        onChange={getCountPolisiesAndValue}
                    />
                    <Select
                        setId="companiesActs"
                        options={insCompany}
                        style="requared input__L"
                        name="Страховая компания"
                        onChange={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="nowActs"
                        value={now}
                        style="input__L  requared"
                        name="Дата оформления с"
                        onBlur={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="monthActs"
                        value={month}
                        style="input__L  requared"
                        name="Дата оформления по"
                        onBlur={getCountPolisiesAndValue}
                    />
                    <Input
                        setId="nameAct"
                        name="Название Акта"
                        style="input__L  requared"
                    />
                    <Button
                        onClick={createAct}
                        style="button_green"
                        name="Создать Акт"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpActs };
