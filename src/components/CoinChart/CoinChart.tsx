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
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
      );
      const data = await res.json() as ChartData;
      setCoin(data.data.map((item) => ({
        ...item,
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
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="priceUsd" stroke="#8884d8" />
      </LineChart>
    </ResponsiveContainer>
  );
}

export default CoinChart;
