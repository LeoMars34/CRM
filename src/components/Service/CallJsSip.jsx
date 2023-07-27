import React, { useState } from "react";
import { WebSocketInterface, UA } from "jssip";
import { useEffect } from "react";

const CallButton = ({ onClick, disabled, label }) => (
    <button onClick={onClick} disabled={disabled}>
        {label}
    </button>
);
const Dialer = () => {
    const [phoneNumber, setPhoneNumber] = useState("");
    const [callStatus, setCallStatus] = useState(null);
    const [userAgent, setUserAgent] = useState(null);
    const [session, setSession] = useState(null);
    // Функция для создания и настройки WebSocketInterface и UserAgent
    const setupUserAgent = () => {
        const socket = new WebSocketInterface("wss://ip.beeline.ru");
        const ua = new UA({
            sockets: [socket],
            uri: "SIP00NLIU00LIR@ip.beeline.ru",
            password: "cr6!(=/9/A(os(B(",
        });
        ua.on("connecting", () => setCallStatus("Connecting..."));
        ua.on("connected", () => setCallStatus("Connected"));
        ua.on("disconnected", () => setCallStatus("Disconnected"));
        ua.on("registered", () => setCallStatus("Registered"));
        ua.on("unregistered", () => setCallStatus("Unregistered"));
        setUserAgent(ua);
    };
    // Функция для набора номера
    const makeCall = () => {
        if (!userAgent) {
            return;
        }
        const options = {
            mediaConstraints: { audio: true, video: false },
        };
        const session = userAgent.call(
            `SIP00NLIU00LIR${phoneNumber}@ip.beeline.ru`,
            options
        );
        setSession(session);
        session.on("connecting", () => setCallStatus("Calling..."));
        session.on("progress", () => setCallStatus("Ringing..."));
        session.on("accepted", () => setCallStatus("Call accepted"));
        session.on("terminated", () => {
            setCallStatus("Call ended");
            setSession(null);
        });
    };
    // Функция для ответа на звонок
    const answerCall = () => {
        if (session) {
            session.answer({ mediaConstraints: { audio: true, video: false } });
            setCallStatus("Call accepted");
        }
    };
    // Функция для завершения вызова
    const endCall = () => {
        if (session) {
            session.terminate();
        }
    };
    // Обработчик изменения поля ввода номера
    const handlePhoneNumberChange = (event) => {
        setPhoneNumber(event.target.value);
    };
    // Обработчик отправки формы с номером
    const handleFormSubmit = (event) => {
        console.log(123);
        event.preventDefault();
        makeCall();
    };

    // При монтировании компонента настраиваем UserAgent
    useEffect(() => {
        setupUserAgent();
    }, []);

    return (
        <div>
            <h2>Звонилка</h2>

            <form onSubmit={handleFormSubmit}>
                <input
                    type="text"
                    value={phoneNumber}
                    onChange={handlePhoneNumberChange}
                />
                <CallButton
                    onClick={makeCall}
                    disabled={
                        !userAgent ||
                        callStatus !== "Registered" ||
                        phoneNumber.length === 0
                    }
                    label="Call"
                />
            </form>

            <div>Статус: {callStatus}</div>

            {session && callStatus === "Ringing..." && (
                <div>
                    <CallButton onClick={answerCall} label="Answer" />
                    <CallButton onClick={endCall} label="Reject" />
                </div>
            )}

            {session && callStatus === "Call accepted" && (
                <div>
                    <CallButton onClick={endCall} label="End Call" />
                </div>
            )}
        </div>
    );
};

export default Dialer;
