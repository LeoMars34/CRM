import { Button } from "../components/Elements/Button";
import { Input } from "../components/Elements/Input";
import { useEffect } from "react";
import { InfoPopUp } from "../components/Service/InfoPopUp";
import { Login } from "../Api";

import { PieChartStatistic } from "../components/Elements/PieChartStatistic";

function Authorization() {
    useEffect(() => {
        let list = document.querySelectorAll(".navigation li");
        list.forEach((item) => {
            item.classList.remove("hovered");
        });
        list[11].classList.add("hovered");
    }, []);
    /*Функция логирования*/
    function LogIn() {
        if (document.getElementById("inputLoginId").value == "") {
            document.getElementById("inputLoginId").classList.add("red_border");
            InfoPopUp("ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ", "popup__Info_red");
        }
        if (document.getElementById("inputPasswordId").value == "") {
            document
                .getElementById("inputPasswordId")
                .classList.add("red_border");
            InfoPopUp("ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ", "popup__Info_red");
        } else {
            const LoginArray = {
                login: document.getElementById("inputLoginId").value,
                password: document.getElementById("inputPasswordId").value,
            };
            Login(LoginArray).then((data) => {
                if (data.error) {
                    InfoPopUp(data.error, "popup__Info_red");
                }
            });
        }
    }
    return (
        <div className="container__Authorization">
            <div className="content__Authorization">
                <div className="form__Authorization">
                    <img src="logoContur.png" alt="" />
                    <Input setId="inputLoginId" name="Логин" />
                    <Input setId="inputPasswordId" name="Пароль" />
                    <Button
                        onClick={LogIn}
                        style="button_green"
                        name="Авторизоваться"
                    />
                </div>
                <PieChartStatistic />
            </div>
        </div>
    );
}
export { Authorization };
