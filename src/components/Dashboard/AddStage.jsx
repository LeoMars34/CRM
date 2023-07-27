import { Button } from "../Elements/Button";
import { Input } from "../Elements/Input";
import { createStages, getDeals } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function AddStage({ setStage, setDeals, idFunnel, setAddStage }) {
    /*Функция закрытия AddStage*/
    function closeAddStage() {
        setAddStage(false);
        document.getElementById("inputAddNewStage").value = "";
    }
    /*Функция добавления нового этапа*/
    function addNewStage() {
        let addNewStage = document.getElementById("inputAddNewStage").value;
        if (idFunnel) {
            createStages(idFunnel.id, addNewStage).then((response) => {
                if (response.error) {
                    InfoPopUp(response.error, "popup__Info_red");
                } else {
                    setStage(response);
                }
                getDeals(idFunnel.id).then((data) => {
                    if (data.error) {
                        InfoPopUp(data.error, "popup__Info_red");
                    } else {
                        setDeals(data);
                    }
                });
                setAddStage(false);
                document.getElementById("inputAddNewStage").value = "";
            });
        }
    }

    return (
        <div className="container__addStage">
            <div className="content__Acts">
                <Input
                    setId="inputAddNewStage"
                    name="Название этапа"
                    style="input__M"
                />
                <div className="big__logo">
                    <Button
                        onClick={addNewStage}
                        setId="addNewStage"
                        style="button_green"
                        name={<ion-icon name="checkmark-outline"></ion-icon>}
                    />
                    <Button
                        onClick={closeAddStage}
                        style="button_red"
                        setId="cancelAddStage"
                        name={<ion-icon name="trash-outline"></ion-icon>}
                    />
                </div>
            </div>
        </div>
    );
}
export { AddStage };
