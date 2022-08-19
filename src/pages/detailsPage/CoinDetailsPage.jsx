import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CoinChart from "../../components/CoinChart/CoinChart";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoin } from "../../store/actionCreators";
import Modal from "../../components/Modal/Modal";
import "./CoinDetailsPage.scss";
import { coinAdd } from "../../store/slices/coinCartSlice";
import { v4 as uuidv4 } from "uuid";

const CoinDetailsPage = () => {
  const dispatch = useAppDispatch();
  const { coin, loading } = useAppSelector((state) => state.coinDetail);
  const [modalActive, setModalActive] = useState(false);
  const [id, setId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState("");
  const [price, setPrice] = useState();
  const params = useParams();

  useEffect(() => {
    dispatch(fetchCoin(params.id));
  }, [dispatch, params.id]);

  const onValueChange = (e) => {
    setQuantity(e.target.value);
  };

  const handleAdd = (e) => {
    e.preventDefault();
    const addedCoin = {
      quantity: quantity,
      id: uuidv4(),
      name: id,
      symbol: symbol,
      price: Number(quantity) * price,
    };
    dispatch(coinAdd(addedCoin));
    setId("");
    setQuantity("");
    setModalActive(false);
  };

  if (loading) return <p>Loading...</p>;

  return (
    <div className="detail-page">
      <div className="container">
        <div className="info-details detail-page__info">
          <div className="info-details__title">{coin?.name}</div>
          <div className="info-details__wrapper">
            <span className="info-details__param">symbol:</span>
            {coin?.symbol}
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">price USD:</span>
            {coin?.priceUsd.slice(0, 8)} $
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">supply:</span>{" "}
            {coin?.supply.slice(0, 12)}
          </div>
          <div className="info-details__wrapper">
            <span className="info-details__param">market cap USD:</span>{" "}
            {coin?.marketCapUsd.slice(0, 15)}
          </div>
          <div className="info-details__wrapper">
            change percent 24Hr:
            <span
              style={{
                color:
                  Number(coin?.changePercent24Hr) > 0
                    ? "rgb(14, 203, 129)"
                    : "red",
                fontWeight: 500,
                marginLeft: 100,
              }}
            >
              {coin?.changePercent24Hr.slice(0, 5)} %
            </span>{" "}
          </div>
          <button
            className="info-details__btn"
            onClick={() => {
              setModalActive(true);
              setId(id);
              setSymbol(coin?.symbol);
              setPrice(Number(coin?.priceUsd));
            }}
          >
            +
          </button>
        </div>

        <div className="info-details__chart">
          <CoinChart id={coin?.id} height={500} />
        </div>
      </div>
      <Modal
        active={modalActive}
        setActive={setModalActive}
        id={id}
        symbol={symbol}
        price={price}
      >
        <div className="modal-content">
          <h2 className="modal-content__title">
            Add {coin?.id.toUpperCase()} to your briefcase?
          </h2>
          <form onSubmit={handleAdd} className="modal-content__form">
            <input
              required
              type="text"
              name="quantity"
              value={quantity}
              className="modal-content__input"
              id="quantity"
              placeholder="Enter quantity"
              onChange={onValueChange}
            />
            <button type="submit" className="modal-content__btn">
              Add
            </button>
          </form>
        </div>
      </Modal>
    </div>
  );
};

export default CoinDetailsPage;
