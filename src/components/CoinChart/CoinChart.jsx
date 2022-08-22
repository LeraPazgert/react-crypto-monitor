import "chartkick/chart.js";
import { useEffect, useState } from "react";
import { LineChart } from "react-chartkick";

function CoinChart({ id, height }) {
  const [coin, setCoin] = useState([]);

  useEffect(() => {
    const fetchHistoryCoins = async () => {
      const res = await fetch(
        `https://api.coincap.io/v2/assets/${id}/history?interval=d1`
      );
      const data = await res.json();
      setCoin(data.data.map((item) => [item.date, item.priceUsd]));
    };

    fetchHistoryCoins();
  }, [id]);

  return (
    <>
      <LineChart data={coin} height={height} />
    </>
  );
}

export default CoinChart;
