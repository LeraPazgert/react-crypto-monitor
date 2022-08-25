import "./Navigation.scss";
import { useCallback, useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import CoinCartModal from "../CoinCartModal/CoinCartModal";

const Navigation = () => {
  const dispatch = useAppDispatch();
  const [modalActive, setModalActive] = useState<boolean>(false);
  const { purchasedCoins } = useAppSelector((state) => state.coinsCart);
  const { coins } = useAppSelector((state) => state.coins);

  useEffect(() => {
    dispatch(fetchCoins());
  }, [dispatch]);

  const total: number = useMemo(() => {
    return purchasedCoins
      .map(
        (item) =>
          +(coins.find((c) => c.symbol === item.symbol)?.priceUsd || 0) *
          parseInt(`${item.quantity}`)
      )
      .reduce((acc, cur) => acc + cur, 0);
  }, [purchasedCoins, coins]);

  const totalSpent: number = useMemo(() => {
    return purchasedCoins.reduce((acc, cur) => acc + (+cur.price), 0);
  }, [purchasedCoins]);

  const diffUsd: number | '' = useMemo(() => {
    return total ? +(total - totalSpent).toFixed(2) : '';
  }, [total, totalSpent]);

  const diffPercent: number | '' = useMemo(() => {
    return total
      ? +(((total - totalSpent) / totalSpent) * 100).toFixed(2)
      : "";
  }, [total, totalSpent]);

  const activeModal = useCallback(() => setModalActive(true), [setModalActive]);

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
              <span style={{
                marginLeft: 5,
              }}>{diffUsd > 0 ? (`+${diffUsd}`) : diffUsd}</span>
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
                onClick={activeModal}
                className="navigation__button"
              >
                <img
                  className="navigation__briefcase-image"
                  src="https://img.icons8.com/external-xnimrodx-lineal-color-xnimrodx/64/000000/external-briefcase-startup-business-xnimrodx-lineal-color-xnimrodx.png"
                  alt="briefcase"
                />
              </button>
            </div>
            {modalActive && <CoinCartModal active={modalActive} setActive={setModalActive} />}
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
