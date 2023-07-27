import { useState, useEffect } from "react";
import { getManagersTelefony } from "../Api";
import { PieChartStatistic } from "../components/Elements/PieChartStatistic";
import { Loader } from "../components/Elements/Loader";
import { StakedBarStatisticCall } from "../components/Elements/StakedBarStatisticCall";
import { Table } from "../components/Elements/Table";
import { StakedAreaChart } from "../components/Elements/StakedAreaChart";

function TelefonyStatistic() {
    const [statistic, setStatistic] = useState([]);
    const [statistic_2, setStatistic_2] = useState([]);
    const [loader, setLoader] = useState(false);
    let callHeaderArray = [
        "Менеджер",
        "Звонки",
        "Недозвоны",
        "Недозвоны %",
        "Дозвоны",
        "Дозвоны %",
        "20сек",
        "20сек %",
        "Всего минут",
        "Ср. время",
    ];

    useEffect(() => {
        getManagersTelefony(`analitycs`).then((data) => {
            setStatistic(data.results);
        });
        getManagersTelefony(`analitycs_2`).then((data) => {
            setStatistic_2(data.results);
        });
    }, []);

    return (
        <div className="telefonyStatistic">
            {statistic.length == 0 ? (
                <Loader />
            ) : (
                <div className="container__table_widthAuto item_1">
                    <Table
                        loader={loader}
                        header={callHeaderArray}
                        props={statistic}
                        title="Звонки"
                    />
                </div>
            )}

            {statistic.length == 0 ? (
                <Loader />
            ) : (
                <div className="item_4">
                    <PieChartStatistic statistic={statistic} />
                </div>
            )}
            {statistic.length == 0 ? (
                <Loader />
            ) : (
                <div className="item_2">
                    <StakedBarStatisticCall statistic={statistic} />
                </div>
            )}
            {statistic.length == 0 ? (
                <Loader />
            ) : (
                <div className="item_3">
                    <StakedAreaChart statistic_2={statistic_2} />
                </div>
            )}
        </div>
    );
}
export { TelefonyStatistic };
