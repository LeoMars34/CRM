import { regManagers } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpRegManagers({ setUser, sd }) {
    /*Функция добавления менеджера*/
    function addManagers() {
        let formData = new FormData();
        let lastNameAddManagerId = document.getElementById(
            "lastNameAddManagerId"
        ).value;
        let firstNameAddManagerId = document.getElementById(
            "firstNameAddManagerId"
        ).value;
        let middleNameAddManagerId = document.getElementById(
            "middleNameAddManagerId"
        ).value;
        let loginAddManagerId =
            document.getElementById("loginAddManagerId").value;
        let passworAddManagerdId = document.getElementById(
            "passworAddManagerdId"
        ).value;
        let sdAddManagersId = document.getElementById("sdAddManagersId").value;
        formData.append("last_name", lastNameAddManagerId);
        formData.append("first_name", firstNameAddManagerId);
        formData.append("middle_name", middleNameAddManagerId);
        formData.append("username", loginAddManagerId);
        formData.append("password", passworAddManagerdId);
        formData.append("sd", sdAddManagersId);
        regManagers(formData).then((response) => {
            setUser(false);
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                InfoPopUp(
                    `${loginAddManagerId} УСПЕШНО ДОБАВЛЕН`,
                    "popup__Info_green"
                );
            }
        });
    }
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setUser(false);
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                    Добавление Менеджера
                </h3>
                <div className="content__Acts">
                    <Input
                        style="input__M"
                        setId="lastNameAddManagerId"
                        name="Фамилия"
                    />
                    <Input
                        style="input__M"
                        setId="firstNameAddManagerId"
                        name="Имя"
                    />
                    <Input
                        style="input__M"
                        setId="middleNameAddManagerId"
                        name="Отчество"
                    />
                    <Input
                        style="input__M"
                        setId="loginAddManagerId"
                        name="Логин"
                    />
                    <Input
                        style="input__M"
                        setId="passworAddManagerdId"
                        name="Пароль"
                    />
                    <Select
                        style="input__M"
                        setId="sdAddManagersId"
                        options={sd}
                        name="Отдел продаж"
                    />
                    <Button
                        style="button_green"
                        onClick={addManagers}
                        name="Добавить"
                    />
                </div>
            </div>
        </div>
    );
}
export { PopUpRegManagers };
