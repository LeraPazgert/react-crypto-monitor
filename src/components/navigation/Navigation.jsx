import "./Navigation.scss";
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import { coinDeleted } from "../../store/slices/coinCartSlice";
import Modal from "../Modal/Modal";

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

  const handleDelete = (id) => {
    dispatch(coinDeleted(id));
  };

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
            <Modal active={modalActive} setActive={setModalActive}>
              {!purchasedCoins.length ? (
                <div className="briefcase__empty">Your briefcase is empty</div>
              ) : (
                <>
                  <div className=" briefcase briefcase__title navigation__briefcase">
                    In your briefcase:
                  </div>
                  {purchasedCoins.map(({ id, symbol, quantity }) => (
                    <div key={id}>
                      <div>
                        <div className="briefcase__wrapper">
                          <div className="briefcase__coin">
                            {symbol} {quantity}
                          </div>
                          <button
                            onClick={() => handleDelete(id)}
                            className="briefcase__btn"
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </>
              )}
            </Modal>
          </div>
        </div>
      </nav>
    </>
  );
};

export default Navigation;
