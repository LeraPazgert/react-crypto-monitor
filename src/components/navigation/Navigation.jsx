import "./Navigation.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import CoinCartModal from "../CoinCartModal/CoinCartModal";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState(false);
  const { purchasedCoins } = useAppSelector((state) => state.coinsCart);
  const { coins } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const total = useMemo(() => {
    return purchasedCoins
      .map(
        (item) =>
          (coins.find((c) => c.symbol === item.symbol)?.priceUsd || 0) *
          parseInt(item.quantity)
      )
      .reduce((acc, cur) => acc + cur, 0);
  }, [purchasedCoins, coins]);

  const totalSpent = useMemo(() => {
    return purchasedCoins.reduce((acc, cur) => acc + parseInt(cur.price), 0);
  }, [purchasedCoins]);

  const diffUsd = (totalSpent - total).toFixed(2);
  const diffPercent = total
    ? (((total - totalSpent) / totalSpent) * 100).toFixed(2)
    : "";

  return (
    <>
      <nav className="navigation">
        <div className="container">
          <div className="navigation__wrapper">
            <Link className="navigation__title" to="/">
              Crypto Monitor
            </Link>
            <div className="navigation__total">
              {total.toFixed(2)}USD
              <span> {diffUsd}</span>
              <span
                style={{
                  color: diffPercent > 0 ? "rgb(14, 203, 129)" : "red",
                  fontWeight: 500,
                  marginLeft: 5,
                }}
              >
                ({diffPercent}%)
              </span>
              <button
                onClick={() => setModalActive(true)}
                className="navigation__button"
              >
                <img
                  className="navigation__briefcase-image"
                  src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-briefcase-startup-business-xnimrodx-lineal-color-xnimrodx.png"
                  alt="briefcase"
                />
              </button>
            </div>
            <CoinCartModal active={modalActive} setActive={setModalActive}/>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
