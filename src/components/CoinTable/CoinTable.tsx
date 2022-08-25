import "./CoinTable.scss";
import { useCallback, useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import CoinAdditionModal from "../CoinAdditionModal/CoinAdditionModal";
import { ICoin } from "../../models/models";
import TableRow from "../TableRow/TableRow";

const CoinTable = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.coins);
  const [limit, setLimit] = useState<number>(15);
  const [selectedCoin, setSelectedCoin] = useState<string | null | boolean>(null);

  useEffect(() => {
    dispatch(fetchCoins(limit));
  }, [dispatch, limit]);

  const loadMore = useCallback(() => {
    setLimit(l => l + 10)
  }, [setLimit])

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
              (item: ICoin) => (
                <TableRow key={item.id} item={item} setSelectedCoin={setSelectedCoin} />
              )
            )}
          </tbody>
        </table>
        <button
          className="more-button coins-table__button"
          onClick={loadMore}
        >
          More
        </button>
        {!!selectedCoin && <CoinAdditionModal
          {...coins.find((c) => c.id === selectedCoin)}
          active={!!selectedCoin}
          setActive={setSelectedCoin}
        />}
      </div>
    </div>
  );
};

export default CoinTable;
