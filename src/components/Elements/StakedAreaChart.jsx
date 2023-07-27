import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
} from "recharts";

function StakedAreaChart({ statistic_2 }) {
    console.log(statistic_2);
    return (
        <ResponsiveContainer width="100%" height="100%">
            <AreaChart
                width={500}
                height={400}
                data={statistic_2}
                margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                }}
            >
                <CartesianGrid strokeDasharray="4 4" />
                <XAxis dataKey="hour" />
                <YAxis />
                <Tooltip />
                <Area
                    type="monotone"
                    label={{ position: "top" }}
                    dataKey="total_calls"
                    stackId="2"
                    stroke="#fcb605"
                    fill="#fcb605"
                />
                <Area
                    type="monotone"
                    label={{ position: "top" }}
                    dataKey="recieved_placed_count"
                    stackId="1"
                    stroke="#05fc26"
                    fill="#05fc26"
                />
                <Area
                    type="monotone"
                    label={{ position: "top" }}
                    dataKey="missed_count"
                    stackId="3"
                    stroke="#bf05fc"
                    fill="#bf05fc"
                />
            </AreaChart>
        </ResponsiveContainer>
    );
}

export { StakedAreaChart };
