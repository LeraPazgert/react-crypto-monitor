import { useEffect, useState } from "react";
import { CartesianGrid, Legend, Line, LineChart, Tooltip, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface ChartDataItem {
  date: string, priceUsd: string, time:any 
}
interface ChartData {
  data: ChartDataItem[]
}

interface CoinChartProps {
  id?: string
}
function CoinChart({ id }: CoinChartProps) {
  const [coin, setCoin] = useState<ChartDataItem[]>([]);

  useEffect(() => {
    const fetchHistoryCoins = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_BASE_URL}assets/${id}/history?interval=d1&start=1640995200000&end=1661299200000`
      );
      const data = await res.json() as ChartData;
      setCoin(data.data.map((item) => ({
        ...item,
        priceUsd: Number(item.priceUsd).toFixed(2),
        time: new Date(item.time).toDateString()
      })))
    };

    fetchHistoryCoins();
  }, [id]);

  return (
    <ResponsiveContainer>
      <LineChart data={coin}>
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey='time' />
        <YAxis dataKey="priceUsd" />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CoinChart;
