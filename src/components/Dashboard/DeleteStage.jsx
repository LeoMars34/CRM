import { useEffect, useState } from "react";
import { Button } from "../Elements/Button";
import { Select } from "../Elements/Select";
import { getStages, deleteStage } from "../../Api";
import { InfoPopUp } from "../Service/InfoPopUp";

function DeleteStage({ id, setId, setStage }) {
    const [stageOptions, setStageOptions] = useState([]);
    useEffect(() => {
        /*Наполняем select и фильтруем его исключая этап на который нажали*/
        getStages(1).then((data) => {
            let arrayStage = [];
            data.forEach((item) => {
                arrayStage.push(item.stage);
            });
            let newArrayStage = arrayStage.filter(function (item) {
                return item.id != id;
            });
            setStageOptions(newArrayStage);
        });
    }, []);
    /*Функция удаления этапа*/
    function deleteArrayStage() {
        let selectId = document.getElementById("selectDeleteStage").value;
        deleteStage(id, selectId).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                setStage(response);
                setId();
            }
        });
    }
    /*Функция закрытия удаления этапа*/
    function closePopUp(e) {
        if (!e.target.closest(".contentDeleteStage")) {
            setId();
        }
    }

    return (
        <div onClick={closePopUp} className="main__container">
            <div className="contentDeleteStage">
                <h3 style={{ color: "red" }}>
                    Чтобы удалить этап, нужно перенести сделки на другой
                </h3>
                <Select
                    first={1}
                    name="Этапы"
                    options={stageOptions}
                    setId="selectDeleteStage"
                />
                <Button
                    style="button_red"
                    onClick={deleteArrayStage}
                    name="Удалить"
                />
            </div>
        </div>
    );
}
export { DeleteStage };
