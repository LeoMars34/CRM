import { updateStageName, changeStages, getStages, getDeals } from "../../Api";
import { Button } from "../Elements/Button";
import { CustomContext } from "../Service/Context";
import { useContext, useEffect, useState } from "react";
import { InfoPopUp } from "../Service/InfoPopUp";

function Stage({
    props,
    setId,
    setStage,
    setCurrentStage,
    currentStage,
    setDeals,
    idFunnel,
}) {
    const [editing, setEditing] = useState(false);
    const [name, setName] = useState(props.stage.name);
    const admin = useContext(CustomContext);
    const [sort, setSort] = useState();
    const [stageId, setStageId] = useState();
    useEffect(() => {
        if (document.getElementById("inputUpdateStage")) {
            document.getElementById("inputUpdateStage").focus();
        }
    }, [editing]);
    /*Редактирование этапа и фокус на input*/
    const handleEditClick = (e) => {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
        e.target.parentNode.parentNode.parentNode.firstChild.classList.remove(
            "active"
        );
        setEditing(true);
        if (document.getElementById("inputUpdateStage")) {
            document.getElementById("inputUpdateStage").focus();
        }
    };
    /*Удаление этапа продаж*/
    function hadleDeleteStage(e, setId) {
        let idDelete = props.stage.id;
        setId(idDelete);
        if (document.querySelector(".contenerDeleteStage")) {
            document
                .querySelector(".contenerDeleteStage")
                .classList.toggle("active");
        }
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
    }
    /*Функция изменения названия этапа*/
    const handleNameChange = (event) => {
        setName(event.target.value);
    };
    const handleKeyDown = (event) => {
        if (event.keyCode === 27) {
            setEditing(false);
        }
        if (event.keyCode === 13) {
            handleNameSave();
        }
    };
    /*Функция открытия редактора этапа*/
    function showEditStage(e) {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
        if (e.keyCode === 27) {
            setEditing(false);
        }
    }
    /*Функция закрытия редактора этапа*/
    function closeRedactorStage(e) {
        e.target.parentNode.parentNode.parentNode.firstChild.classList.toggle(
            "active"
        );
    }
    /*Сохранение измененного этапа */
    function handleNameSave() {
        let newId = props.stage.id;
        let newName = document.getElementById("inputUpdateStage").value;
        updateStageName(newId, newName).then((response) => {
            setStage(response);
        });
        setEditing(false);
    }
    /*Drag and Drop для этапов*/
    function dragStart(e) {
        setCurrentStage({ ...currentStage, stage: props.stage });
        e.target.classList.add("selected");
        setStageId(props.stage.id);
        setSort(props.stage.sort);
    }
    function dragEnd(e) {
        document.querySelectorAll(".dragRight").forEach((item) => {
            item.classList.remove("dragRight");
        });
        document.querySelectorAll(".dragLeft").forEach((item) => {
            item.classList.remove("dragLeft");
        });
        e.target.classList.remove("selected");
        changeStages(currentStage).then((response) => {
            if (response.error) {
                InfoPopUp(response.error, "popup__Info_red");
            } else {
                if (idFunnel) {
                    getStages(idFunnel.id).then((data) => {
                        if (data.error) {
                            InfoPopUp(data.error, "popup__Info_red");
                        } else {
                            setStage(data);
                        }
                    });
                    getDeals(idFunnel.id).then((data) => {
                        if (data.error) {
                            InfoPopUp(data.error, "popup__Info_red");
                        } else {
                            setDeals(data);
                        }
                    });
                }
            }
        });
    }
    /*Функция для того чтобы элементы раздвигались при Drag and Drop*/
    function dragOver(e, currentStage) {
        if (
            e.currentTarget.classList.contains("containerFlex__header_single")
        ) {
            e.preventDefault();
            if (e.currentTarget.classList.contains("dragLeft")) {
                e.currentTarget.classList.remove("dragLeft");
                setCurrentStage({
                    ...currentStage,
                    target: e.currentTarget.dataset.id,
                    position: "bef",
                });
                return;
            }
            if (e.currentTarget.classList.contains("dragRight")) {
                e.currentTarget.classList.remove("dragRight");
                setCurrentStage({
                    ...currentStage,
                    target: e.currentTarget.dataset.id,
                    position: "aft",
                });
                return;
            }
            if (
                e.currentTarget.classList.contains(
                    "containerFlex__header_single"
                ) &&
                e.currentTarget.dataset.id != currentStage.stage.id
            ) {
                if (e.currentTarget.dataset.sort > currentStage.stage.sort) {
                    e.currentTarget.classList.add("dragLeft");
                    setCurrentStage({
                        ...currentStage,
                        target: e.currentTarget.dataset.id,
                        position: "aft",
                    });
                } else {
                    e.currentTarget.classList.add("dragRight");
                    setCurrentStage({
                        ...currentStage,
                        target: e.currentTarget.dataset.id,
                        position: "bef",
                    });
                }
            }
        } else return;
    }

    return (
        <div
            data-id={props.stage.id}
            data-sort={props.stage.sort}
            draggable
            className="containerFlex__header_single"
            onDragStart={(e) => {
                dragStart(e);
            }}
            onDragEnd={dragEnd}
            onDragOver={(e) => {
                dragOver(e, currentStage);
            }}
        >
            <div className={admin ? "containerStage" : "containerStageManager"}>
                <div className="redactorStageDiv">
                    <Button
                        onClick={(e) => {
                            handleEditClick(e);
                        }}
                        name="Редактировать"
                    />
                    <Button
                        setId="buttonDeleteStage"
                        name="Удалить"
                        style="button_red"
                        onClick={(e) => {
                            hadleDeleteStage(e, setId);
                        }}
                    />
                    <span className="closeRedactorStage">
                        <ion-icon
                            onClick={(e) => {
                                closeRedactorStage(e);
                            }}
                            name="close-outline"
                        ></ion-icon>
                    </span>
                </div>
                <div className="containerStageContent">
                    {admin ? (
                        <span className={editing ? "none" : "redactorStage"}>
                            <ion-icon
                                onClick={(e) => {
                                    showEditStage(e);
                                }}
                                name="create-outline"
                            ></ion-icon>
                        </span>
                    ) : (
                        ""
                    )}
                    {editing ? (
                        <input
                            id="inputUpdateStage"
                            onKeyDown={handleKeyDown}
                            type="text"
                            value={name}
                            onChange={handleNameChange}
                            style={{ outline: "none" }}
                        />
                    ) : (
                        <h3>{props.stage.name}</h3>
                    )}
                    <div
                        className={editing ? "none" : "containerStage_quantity"}
                    >
                        <h5>{props.count}</h5>
                        <h5>{props.sum}&#8381;</h5>
                    </div>
                </div>
            </div>
        </div>
    );
}
export { Stage };
