import {Legend, Pie, PieChart, Tooltip, TooltipIndex, Cell} from 'recharts';

export default function PieChartCampaign({
                                             isAnimationActive = true,
                                             defaultIndex,
                                            data
                                         }: {
    isAnimationActive?: boolean;
    defaultIndex?: TooltipIndex;
    data: any[];
}) {
    const COLORS = ['#13463d', '#187068', '#1d9a91'];

    return (
        <PieChart
            style={{ width: '100%', maxWidth: '50vw', maxHeight: '30vh', aspectRatio: 1 }}
            responsive
        >
            <Pie
                data={data}
                dataKey="value"
                cx="50%"
                cy="50%"
                outerRadius="80%"
                fill="#13463d"
                isAnimationActive={isAnimationActive}
            >
                {data?.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
            </Pie>
            <Tooltip defaultIndex={defaultIndex} />
            <Legend />
        </PieChart>
    );
}