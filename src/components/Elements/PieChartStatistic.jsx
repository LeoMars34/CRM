import React, { useCallback, useEffect, useState } from "react";
import { PieChart, Pie, Sector, Cell } from "recharts";

const renderActiveShape = (props) => {
    const RADIAN = Math.PI / 180;
    const {
        cx,
        cy,
        midAngle,
        innerRadius,
        outerRadius,
        startAngle,
        endAngle,
        fill,
        payload,
        percent,
        value,
    } = props;
    const sin = Math.sin(-RADIAN * midAngle);
    const cos = Math.cos(-RADIAN * midAngle);
    const sx = cx + (outerRadius + 10) * cos;
    const sy = cy + (outerRadius + 10) * sin;
    const mx = cx + (outerRadius + 30) * cos;
    const my = cy + (outerRadius + 30) * sin;
    const ex = mx + (cos >= 0 ? 1 : -1) * 22;
    const ey = my;
    const textAnchor = cos >= 0 ? "start" : "end";

    return (
        <g>
            <text
                style={{ fontSize: "32px" }}
                x={cx}
                y={cy}
                dy={8}
                textAnchor="middle"
                fill="#000"
            >
                Звонки
            </text>
            <Sector
                cx={cx}
                cy={cy}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                startAngle={startAngle}
                endAngle={endAngle}
                fill={fill}
            />
            <Sector
                cx={cx}
                cy={cy}
                startAngle={startAngle}
                endAngle={endAngle}
                innerRadius={outerRadius + 6}
                outerRadius={outerRadius + 10}
                fill={fill}
            />
            <path
                d={`M${sx},${sy}L${mx},${my}L${ex},${ey}`}
                stroke={fill}
                fill="none"
            />
            <circle cx={ex} cy={ey} r={2} fill={fill} stroke="none" />
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                textAnchor={textAnchor}
                fill="#333"
            >
                {payload.name}
            </text>
            <text
                x={ex + (cos >= 0 ? 1 : -1) * 12}
                y={ey}
                dy={18}
                textAnchor={textAnchor}
                fill="#333"
            >
                {value}
            </text>
        </g>
    );
};

export function PieChartStatistic({ statistic }) {
    const [activeIndex, setActiveIndex] = useState(0);
    const [newState, setNewState] = useState();

    const onPieEnter = useCallback(
        (_, index) => {
            setActiveIndex(index);
        },
        [setActiveIndex]
    );
    const getRandomColor = () => {
        const r = Math.floor(Math.random() * 256);
        const g = Math.floor(Math.random() * 256);
        const b = Math.floor(Math.random() * 256);
        return `rgb(${r}, ${g}, ${b})`;
    };
    useEffect(() => {
        if (statistic) {
            let newStat = statistic.map((i) => {
                return {
                    name: i.abonent,
                    value: i.calls_count,
                    color: getRandomColor(),
                };
            });
            setNewState(newStat);
        }
    }, []);
    return (
        <PieChart width={720} height={400}>
            <Pie
                activeIndex={activeIndex}
                activeShape={renderActiveShape}
                data={newState}
                cx={350}
                cy={200}
                innerRadius={80}
                outerRadius={140}
                dataKey="value"
                onMouseEnter={onPieEnter}
            >
                {newState
                    ? newState.map((i, index) => (
                          <Cell key={`cell-${index}`} fill={i.color} />
                      ))
                    : null}
            </Pie>
        </PieChart>
    );
}
