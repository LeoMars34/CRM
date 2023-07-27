import { Link } from "react-router-dom";
import { Input } from "../Elements/Input";
import { Select } from "../Elements/Select";
import { Table } from "../Elements/Table";
import { useEffect } from "react";

function LiveTape() {
    useEffect(() => {
        let closeLiveTape = document.getElementById("closeLiveTape");
        if (closeLiveTape) {
            closeLiveTape.onclick = function () {
                document.getElementById("LiveTape").classList.toggle("active");
            };
        }
    }, []);
    let agentArray = [
        {
            Информация: "Погода такая",
            Название: <Link to="#">Майские</Link>,
            Дата: "01.05.2023",
        },
        {
            Информация: "Что хочется сидеть на берегу волги",
            Название: <Link to="#">Близко</Link>,
            Дата: "08.05.2023",
        },
        {
            Информация: "Пить холодное пиво и жарить шашлык",
            Название: <Link to="#">Близко</Link>,
            Дата: "09.05.2023",
        },
    ];
    let title = "Живая лента";
    return (
        <div id="LiveTape" className="LiveTape">
            <div className="content">
                <div id="closeLiveTape" className="closeLiveTape">
                    <ion-icon name="close-outline"></ion-icon>
                </div>
                <div className="container__header_relative">
                    <Select name="Событие" />
                    <Select name="Пользователь" />
                    <Input
                        logo={<ion-icon name="search-outline"></ion-icon>}
                        name="Поиск"
                    />
                </div>
                <Table props={agentArray} title={title} />
            </div>
        </div>
    );
}

export { LiveTape };
