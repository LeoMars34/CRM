import { useEffect, useState } from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
} from "recharts";
function StackedBarManagers({ statistics }) {
    const [managers, setManagers] = useState([]);
    const [names, setNames] = useState([]);

    useEffect(() => {
        if (statistics) {
            let aval = Object.keys(statistics);
            setNames(aval);
            let weekOne = Object.keys(statistics[aval[0]]);
            weekOne.pop();
            let managersNew = [];
            for (let i = 0; i < weekOne.length; i++) {
                let obj = {
                    name: weekOne[i],
                };
                aval.map((j) => {
                    obj[j] = statistics[j][weekOne[i]];
                });
                managersNew.push(obj);
            }
            setManagers(managersNew);
        }
    }, []);

    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    return (
        <BarChart
            width={1000}
            height={300}
            data={managers}
            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
        >
            <CartesianGrid strokeDasharray="4 4" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend align="center" verticalAlign="bottom" layout="horizontal" />
            {names.length > 0 ? (
                names.map((item) => (
                    <Bar
                        dataKey={item}
                        stackId="a"
                        fill={getRandomColor()}
                        label={{ position: "top" }}
                    />
                ))
            ) : (
                <></>
            )}
        </BarChart>
    );
}
export { StackedBarManagers };
