import { useEffect, useState } from "react";
import { getClientsBirthdayCount } from "../../Api";
import { HappyBirthdayClients } from "./HappyBirthdayClients";
import { InfoPopUp } from "../Service/InfoPopUp";

function ToolsMenu() {
    const [clientsBirhdayCount, setClientsBirhdayCount] = useState();
    const [clientsBirhday, setClientsBirhday] = useState();
    let navigationToolsMenu = document.querySelector(".navigationToolsMenu");
    let closeToolsMenu = document.querySelector(".closeToolsMenu");
    useEffect(() => {
        getClientsBirthdayCount().then((data) => {
            if (data.error) {
                InfoPopUp(data.error, "popup__Info_red");
            } else {
                setClientsBirhdayCount(data.count);
            }
        });
    }, []);
    /*Открытие и закрытие инструментов*/
    if (navigationToolsMenu) {
        navigationToolsMenu.onclick = function () {
            navigationToolsMenu.classList.add("active");
            document
                .querySelector(".clientsBirhdays")
                .classList.toggle("active");
        };
    }
    if (closeToolsMenu) {
        closeToolsMenu.onclick = function () {
            navigationToolsMenu.classList.remove("active");
            document
                .querySelector(".clientsBirhdays")
                .classList.remove("active");
        };
    }
    let giftSpan = document.getElementById("giftSpan");
    if (giftSpan) {
        giftSpan.onclick = function () {
            document
                .getElementById("HappyBirthdayClients")
                .classList.toggle("active");
            document.querySelector(".clientsBirhdays").classList.remove("none");
        };
    }
    let createSpan = document.getElementById("createSpan");
    if (createSpan) {
        createSpan.onclick = function () {
            document.getElementById("ProblemBook").classList.toggle("active");
        };
    }
    let chatbox = document.getElementById("chatbox");
    if (chatbox) {
        chatbox.onclick = function () {
            document.getElementById("LiveTape").classList.toggle("active");
        };
    }
    /*Функция закрытия всех инструментов*/
    function closeAllTools() {
        document
            .getElementById("HappyBirthdayClients")
            .classList.remove("active");
        document.getElementById("ProblemBook").classList.remove("active");
        document.getElementById("LiveTape").classList.remove("active");
        setClientsBirhday();
    }

    return (
        <div className="mainToolsMenu">
            <div className="navigationToolsMenu">
                <span id="giftSpan" style={{ "--i": 0, "--x": -1, "--y": 0 }}>
                    <ion-icon name="gift-outline"></ion-icon>
                </span>
                <div className="clientsBirhdays">{clientsBirhdayCount}</div>
                <span id="createSpan" style={{ "--i": 1, "--x": 1, "--y": 0 }}>
                    <ion-icon name="create-outline"></ion-icon>
                </span>
                <span id="chatbox" style={{ "--i": 2, "--x": 0, "--y": -1 }}>
                    <ion-icon name="chatbox-ellipses-outline"></ion-icon>
                </span>
                <span style={{ "--i": 3, "--x": 0, "--y": 1 }}>
                    <ion-icon name="skull-outline"></ion-icon>
                </span>
                <span style={{ "--i": 4, "--x": -1, "--y": 1 }}>
                    <ion-icon name="alarm-outline"></ion-icon>
                </span>
                <span style={{ "--i": 5, "--x": -1, "--y": -1 }}>
                    <ion-icon name="calendar-number-outline"></ion-icon>
                </span>
                <span style={{ "--i": 6, "--x": 1, "--y": -1 }}>
                    <ion-icon name="calculator-outline"></ion-icon>
                </span>
                <span style={{ "--i": 7, "--x": 1, "--y": 1 }}>
                    <ion-icon name="construct-outline"></ion-icon>
                </span>
            </div>
            <div onClick={closeAllTools} className="closeToolsMenu">
                <ion-icon name="close-outline"></ion-icon>
            </div>
            <HappyBirthdayClients
                setClientsBirhday={setClientsBirhday}
                clientsBirhday={clientsBirhday}
            />
        </div>
    );
}
export { ToolsMenu };
