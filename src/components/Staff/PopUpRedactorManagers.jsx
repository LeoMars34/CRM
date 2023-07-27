import { useState } from "react";
import { editManagers } from "../../Api";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { ResetPassword } from "./ResetPassword";
import { InfoPopUp } from "../Service/InfoPopUp";

function PopUpRedactorManagers({ setCurrentManagers, currentManagers, sd }) {
    const [deletePopUp, setDeletePopUp] = useState(false);
    const [password, setPassword] = useState();

    const statusSelectManagers = [
        { id: "true", name: "Активный" },
        { id: "false", name: "Заблокирован" },
    ];
    /*Функция редактирования полей менеджера*/
    function redactorManagers() {
        let id = currentManagers.id;
        let formData = new FormData();
        let firstNameAddManagers = document.getElementById(
            "firstNameAddManagers"
        ).value;
        let lastNameAddManagers = document.getElementById(
            "lastNameAddManagers"
        ).value;
        let middleNameAddManagers = document.getElementById(
            "middleNameAddManagers"
        ).value;
        let sdAddManagers = document.getElementById("sdAddManagers").value;
        let statusAddManagers =
            document.getElementById("statusAddManagers").value;
        formData.append("first_name", firstNameAddManagers);
        formData.append("last_name", lastNameAddManagers);
        formData.append("middle_name", middleNameAddManagers);
        formData.append("sale_department", sdAddManagers);
        formData.append("is_active", statusAddManagers);
        formData.append("user", id);
        editManagers(formData, id).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    function resetPassword() {
        setDeletePopUp(true);
    }
    /*Функция закрытия popUp*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".content__PopUp_CreateDeal")) {
                setCurrentManagers();
            }
        }
    }
    /*Функция копирования пароля в буфер обмена*/
    function copyNewPassword(event) {
        const value = event.target.textContent;
        const tempElement = document.createElement("textarea");
        tempElement.value = value;
        document.body.appendChild(tempElement);
        tempElement.select();
        document.execCommand("copy");
        document.body.removeChild(tempElement);
        setCurrentManagers();
        InfoPopUp(`ПАРОЛЬ УСПЕШНО СКОПИРОВАН`, "popup__Info_green");
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="content__PopUp_CreateDeal">
                <div className="content__Acts">
                    <Input
                        style="input__M"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.first_name}
                        setId="firstNameAddManagers"
                        name="Фамилия"
                    />
                    <Input
                        style="input__M"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.last_name}
                        setId="lastNameAddManagers"
                        name="Имя"
                    />
                    <Input
                        style="input__M"
                        onKeyDown={(e) => {
                            if (e.keyCode === 13) {
                                redactorManagers(e);
                            }
                        }}
                        value={currentManagers.middle_name}
                        setId="middleNameAddManagers"
                        name="Отчество"
                    />
                    <Select
                        style="input__M"
                        onChange={redactorManagers}
                        setId="sdAddManagers"
                        name="Отдел продаж"
                        options={sd}
                        valueName={currentManagers.department__name}
                    />
                    <Select
                        style="input__M"
                        onChange={redactorManagers}
                        setId="statusAddManagers"
                        name="Статус"
                        options={statusSelectManagers}
                        valueName={currentManagers.active_display}
                    />

                    {password ? (
                        <div onClick={copyNewPassword} className="passwordDiv">
                            {password}

                            {<ion-icon name="copy-outline"></ion-icon>}
                        </div>
                    ) : (
                        <Button
                            onClick={resetPassword}
                            style="button_red"
                            name="Сбросить пароль"
                        />
                    )}
                </div>
                {deletePopUp ? (
                    <ResetPassword
                        setDeletePopUp={setDeletePopUp}
                        currentManagers={currentManagers}
                        setCurrentManagers={setCurrentManagers}
                        setPassword={setPassword}
                    />
                ) : (
                    <></>
                )}
            </div>
        </div>
    );
}
export { PopUpRedactorManagers };
