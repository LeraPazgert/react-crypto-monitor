import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import { LineChart } from "react-chartkick";
import "chartkick/chart.js";

import "./CoinTable.scss";
import { useNavigate } from "react-router-dom";

const CoinTable = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.coins);
  const [limit, setLimit] = useState(5);

  const navigate = useNavigate();

  const openCoin = (id) => {
    navigate(`/assets/${id}`);
  };

  useEffect(() => {
    dispatch(fetchCoins(limit));
  }, [limit]);

  return (
    <table className="coins-table">
      <caption className="coins-table__title">
        Cryptocurrency Prices by Market Cap
      </caption>
      <div className="container">
        <thead>
          <tr>
            <th>Rank</th>
            <th>Coin</th>
            <th>Price (USD)</th>
            <th>24Hr%</th>
            <th>Chart</th>
          </tr>
        </thead>

        <tbody>
          {coins.map(({ id, name, rank, priceUsd, changePercent24Hr }) => (
            <tr key={id}>
              <td>{rank}</td>
              <td onClick={() => openCoin(id)}><span className="coins-table__name">{name}</span></td>
              <td>${parseFloat(priceUsd).toFixed(2)}</td>
              <td
                style={{
                  color:
                    parseFloat(changePercent24Hr) > 0
                      ? "rgb(14, 203, 129)"
                      : "red",
                  fontWeight: 500,
                }}
              >
                {parseFloat(changePercent24Hr).toFixed(2)}%
              </td>
              <td>
                <LineChart
                  data={[{ name: "Price", data: priceUsd }]}
                  width={250 + "px"}
                  height={120 + "px"}
                />
              </td>
              <td>
                <button className="coins-table__button">+</button>
              </td>
            </tr>
          ))}
        </tbody>
      </div>
      <button
        className="more-button coins-table__button"
        onClick={() => setLimit(limit + 20)}
      >
        More
      </button>
    </table>
  );
};

export default CoinTable;
