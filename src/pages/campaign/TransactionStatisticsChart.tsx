import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';


const TransactionStatisticsChart = (props: {data: any[]}) => {
    return (
        <BarChart
            style={{ width: '100%', maxWidth: '700px', maxHeight: '70vh', aspectRatio: 1.618 }}
            responsive
            data={props.data}
            margin={{
                top: 5,
                right: 0,
                left: 0,
                bottom: 5,
            }}
        >
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis width="auto" />
            <Tooltip />
            <Legend />
            <Bar name={"Tổng điểm"} dataKey="totalChoose" fill="#13463d" activeBar={{ fill: '#67AE6E', stroke: '#187068' }} radius={[10, 10, 0, 0]} />
        </BarChart>
    );
};

export default TransactionStatisticsChart;