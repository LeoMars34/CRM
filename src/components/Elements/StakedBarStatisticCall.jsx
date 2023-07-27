import { useEffect } from "react";
import { useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
function StakedBarStatisticCall({ statistic }) {
    const [newState, setNewState] = useState();

    useEffect(() => {
        if (statistic) {
            let obj_Call = {
                name: "Звонки",
                Колличество: statistic.reduce((a, b) => {
                    if (a.hasOwnProperty("calls_count")) {
                        a["calls_count"] += b["calls_count"];
                    } else {
                        a["calls_count"] = b["calls_count"];
                    }
                    return a;
                }, {})["calls_count"],
            };
            let obj_MissedCall = {
                name: "Недозвон",
                Колличество: statistic.reduce((a, b) => {
                    if (a.hasOwnProperty("missed_count")) {
                        a["missed_count"] += b["missed_count"];
                    } else {
                        a["missed_count"] = b["missed_count"];
                    }
                    return a;
                }, {})["missed_count"],
            };
            let obj_RecievedCall = {
                name: "Дозвон",
                Колличество: statistic.reduce((a, b) => {
                    if (a.hasOwnProperty("recieved_placed_count")) {
                        a["recieved_placed_count"] +=
                            b["recieved_placed_count"];
                    } else {
                        a["recieved_placed_count"] = b["recieved_placed_count"];
                    }
                    return a;
                }, {})["recieved_placed_count"],
            };
            let obj_Call20 = {
                name: "Свыше 20 сек",
                Колличество: statistic.reduce((a, b) => {
                    if (a.hasOwnProperty("duration_20")) {
                        a["duration_20"] += b["duration_20"];
                    } else {
                        a["duration_20"] = b["duration_20"];
                    }
                    return a;
                }, {})["duration_20"],
            };
            let callsArr = [];
            callsArr.push(
                obj_Call,
                obj_MissedCall,
                obj_RecievedCall,
                obj_Call20
            );
            setNewState(callsArr);
        }
    }, []);

    return (
        <BarChart
            width={500}
            height={300}
            data={newState}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />

            <Bar
                label={{ position: "top" }}
                dataKey="Колличество"
                stackId="a"
                fill="#3174cc"
            />
        </BarChart>
    );
}
export { StakedBarStatisticCall };
