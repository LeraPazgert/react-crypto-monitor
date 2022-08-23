import "./CoinTable.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import { useNavigate } from "react-router-dom";
import CoinAdditionModal from "../CoinAdditionModal/CoinAdditionModal";
import { ICoin } from "../../models/models";

const CoinTable = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.coins);
  const [limit, setLimit] = useState<number>(15);
  const [selectedCoin, setSelectedCoin] = useState<string | null | boolean>(null);

  const navigate = useNavigate();

  const openCoin = (id:string): void => {
    navigate(`/assets/${id}`);
  };

  useEffect(() => {
    dispatch(fetchCoins(limit));
  }, [dispatch, limit]);

  return (
    <div className="coins-table">
      <div>
        <table>
          <caption className="coins-table__title">
            Cryptocurrency Prices by Coin Cap
          </caption>
          <thead>
            <tr>
              <th>Rank</th>
              <th>Coin</th>
              <th>Price (USD)</th>
              <th>24Hr%</th>
              <th>Add</th>
            </tr>
          </thead>
          <tbody>
            {coins.map(
              ({ id, name, rank, priceUsd, changePercent24Hr }: ICoin) => (
                <tr key={id}>
                  <td>{rank}</td>
                  <td onClick={() => openCoin(id)}>
                    <span className="coins-table__name">{name}</span>
                  </td>
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
                    <button
                      className="coins-table__button"
                      onClick={() => {
                        setSelectedCoin(id);
                      }}
                    >
                      +
                    </button>
                  </td>
                </tr>
              )
            )}
          </tbody>
        </table>
        <button
          className="more-button coins-table__button"
          onClick={() => setLimit(limit + 10)}
        >
          More
        </button>
        <CoinAdditionModal
          {...coins.find((c) => c.id === selectedCoin)}
          active={!!selectedCoin}
          setActive={setSelectedCoin}
        />
      </div>
    </div>
  );
};

export default CoinTable;
