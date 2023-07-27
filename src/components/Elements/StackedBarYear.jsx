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
function StackedBarYear({ statistics }) {
    const [values, setValues] = useState([]);
    useEffect(() => {
        if (statistics) {
            let month = Object.keys(statistics[2023]);
            let countOne = Object.values(statistics[2023]);
            let countTwo = Object.values(statistics[2024]);
            let sum = "";
            let arr = [];
            for (let i = 0; i < countOne.length; i++) {
                sum = countOne[i] + countTwo[i];
                arr.push({
                    name: month[i],
                    Заявки: sum,
                });
            }
            setValues(arr);
        }
    }, []);
    return (
        <BarChart
            width={1000}
            height={300}
            data={values}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />

            <Bar
                label={{ position: "top" }}
                dataKey="Заявки"
                stackId="a"
                fill="#82ca9d"
            />
        </BarChart>
    );
}
export { StackedBarYear };
