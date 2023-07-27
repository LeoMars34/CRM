import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { getFunnels, getStages, giveBasePolicy } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpBasePolicy({ setShowBasePolicy, managers, createFilterBody }) {
    const [funnels, setFunnels] = useState([]);
    const [stages, setStage] = useState([]);
    /*Функция заливки базы менеджеру*/
    function goBasePolicy() {
        let body = createFilterBody();
        let stagesBasePolicy = document.getElementById("stagesBasePolicy");
        let countBasePolicy = document.getElementById("countBasePolicy");
        let managersBasePolicy = document.getElementById("managersBasePolicy");
        if (stagesBasePolicy && stagesBasePolicy.value != "") {
            body["stage"] = stagesBasePolicy.value;
        }
        if (countBasePolicy && countBasePolicy.value != "") {
            body["count"] = countBasePolicy.value;
        }
        if (managersBasePolicy && managersBasePolicy.value != "") {
            body["user"] = managersBasePolicy.value;
        }
        giveBasePolicy(body).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    useEffect(() => {
        getFunnels().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setFunnels(data.results);
            }
        });
    }, []);
    /*Фунуция выбора воронки продаж*/
    function chooseFunnel() {
        let arrStages = [];
        let id = document.getElementById("funnelsBasePolicy").value;
        getStages(id).then((data) => {
            data.forEach((item) => {
                arrStages.push({ id: item.stage.id, name: item.stage.name });
            });
            setStage(arrStages);
        });
    }
    /*Функция закрытие popUp*/
    function closePopUp(e) {
        if (!e.target.closest(".container__PopUp")) {
            setShowBasePolicy(false);
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="container__PopUp">
                <div className="content__Acts">
                    <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                        Залить базу
                    </h3>
                    <Select
                        setId="funnelsBasePolicy"
                        options={funnels}
                        onChange={chooseFunnel}
                        name="Воронки"
                        style="requared input__M"
                    />
                    <Select
                        setId="stagesBasePolicy"
                        options={stages}
                        name="Этапы"
                        style="requared input__M"
                    />
                    <Input
                        setId="countBasePolicy"
                        name="Кол-во полисов"
                        type="number"
                        style="input__M"
                    />
                    <Select
                        setId="managersBasePolicy"
                        options={managers}
                        name="Менеджер"
                        style="requared input__M"
                    />
                    <Button
                        onClick={goBasePolicy}
                        style="button_green"
                        name="Передать"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpBasePolicy };
