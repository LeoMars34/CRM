import { useEffect } from "react";
import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { InputFile } from "../Elements/InputFile";
import { InfoPopUp } from "../Service/InfoPopUp";
import { addClient } from "../../Api";

function AddClients({ setAddClient }) {
    useEffect(() => {
        const fileInput = document.getElementById("file-input");
        const fileList = document.getElementById("file-list");
        if (fileInput) {
            fileInput.addEventListener("change", (event) => {
                fileList.innerHTML = "";
                const files = event.target.files;
                for (let i = 0; i < files.length; i++) {
                    const file = files[i];
                    const fileName = file.name;
                    const fileSizeBytes = file.size;
                    const fileSizeMB = fileSizeBytes / 1024 ** 2;
                    const fileSizeMBSlice = fileSizeMB.toFixed(2);
                    const listItem = document.createElement("div");
                    listItem.innerHTML = `${fileName} (${fileSizeMBSlice} mb)`;
                    fileList.appendChild(listItem);
                }
            });
        }
    }, []);
    /*Функция создания клиента*/
    function createClient() {
        let r = false;
        document.querySelectorAll(".requared input").forEach((item) => {
            if (item.value == "") {
                item.classList.add("red_border");
                InfoPopUp(
                    "ПОЛЯ ОБЯЗАТЕЛЬНЫЕ ДЛЯ ЗАПОЛНЕНИЯ",
                    "popup__Info_red"
                );
                r = true;
            }
        });
        if (r) {
            return;
        }
        let formData = new FormData();
        if (document.getElementById("fioAddClient").value) {
            formData.append(
                "full_name",
                document.getElementById("fioAddClient").value
            );
        }
        if (document.getElementById("addHappyBithday").value) {
            formData.append(
                "birthday",
                document.getElementById("addHappyBithday").value
            );
        }
        if (document.getElementById("addPhoneClient").value) {
            formData.append(
                "phone",
                document.getElementById("addPhoneClient").value
            );
        }
        if (document.getElementById("addEmailClient").value) {
            formData.append(
                "email",
                document.getElementById("addEmailClient").value
            );
        }
        if (document.getElementById("addAddressClient").value) {
            formData.append(
                "address",
                document.getElementById("addAddressClient").value
            );
        }
        addClient(formData).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            }
        });
    }
    /*Закртие popUp добавления клиента*/
    function closePopUp(e) {
        {
            if (!e.target.closest(".container__PopUp")) {
                setAddClient();
            }
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="container__PopUp">
                <div className="content__Acts">
                    <h3 style={{ borderBottom: "thick double var(--dark)" }}>
                        Добавить клиента
                    </h3>
                    <Input
                        setId="fioAddClient"
                        name="ФИО клиента"
                        style="requared"
                        Fio="Fio"
                    />
                    <Input
                        setId="addHappyBithday"
                        divId="divAddHappyBirthdayClient"
                        name="Дата рождения клиента"
                        style="requared"
                        Birthday="Birthday"
                    />
                    <Input
                        setId="addPhoneClient"
                        divId="divAddPhoneClient"
                        name="Телефон клиента"
                        style="requared"
                        Phone="Phone"
                    />
                    <Input
                        setId="addEmailClient"
                        divId="divAddEmailClient"
                        name="Email Клиента"
                        Email="Email"
                    />
                    <Input setId="addAddressClient" name="Регион клиента" />
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
                        Email="Email"
                        name="Email КЛ"
                    />
                    <div
                        id="file-list"
                        className="content__AddClients_files"
                    ></div>

                    <InputFile name="Загрузить файл" setId="file-input" />

                    <Button
                        onClick={createClient}
                        style="button_green"
                        name="Сохранить"
                    />
                </div>
            </div>
        </div>
    );
}
export { AddClients };
