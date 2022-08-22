import "./CoinTable.scss";
import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { fetchCoins } from "../../store/actionCreators";
import { useNavigate } from "react-router-dom";
import Modal from "../Modal/Modal";
import { coinAdd } from "../../store/slices/coinCartSlice";
import { v4 as uuidv4 } from "uuid";

const CoinTable = () => {
  const dispatch = useAppDispatch();
  const { coins } = useAppSelector((state) => state.coins);
  const [limit, setLimit] = useState(15);
  const [modalActive, setModalActive] = useState(false);
  const [id, setId] = useState("");
  const [symbol, setSymbol] = useState("");
  const [quantity, setQuantity] = useState();
  const [price, setPrice] = useState();
  const [error, setError] = useState("");
  const [formValid, setFormValid] = useState(false);

  const navigate = useNavigate();

  const openCoin = (id) => {
    navigate(`/assets/${id}`);
  };

  useEffect(() => {
    dispatch(fetchCoins(limit));
  }, [dispatch, limit]);

  useEffect(() => {
    if (error) {
      setFormValid(false);
    } else {
      setFormValid(true);
    }

    if (modalActive === false) {
      setQuantity("");
      setError("");
    }
  }, [error, modalActive]);

  const handleChange = (e) => {
    const regex = new RegExp("[a-zA-Z,_:$!%-]");
    if (regex.test(e.target.value) || e.target.value <= 0) {
      setError("Invalid value");
      setQuantity(e.target.value);
    } else {
      setError("");
      setQuantity(e.target.value);
    }
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
              ({ id, symbol, name, rank, priceUsd, changePercent24Hr }) => (
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
                        setModalActive(true);
                        setId(id);
                        setSymbol(symbol);
                        setPrice(+priceUsd);
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
        <Modal
          active={modalActive}
          setActive={setModalActive}
          id={id}
          symbol={symbol}
          price={price}
        >
          <div className="modal-content coins-table__modal">
            <h2 className="modal-content__title">
              Add {id.toUpperCase()} to your briefcase?
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
                onChange={handleChange}
              />
              <button
                type="submit"
                className="modal-content__btn"
                disabled={!formValid}
              >
                Add
              </button>
              {error && (
                <div
                  style={{
                    color: "red",
                    fontSize: "25px",
                    marginLeft: "20px",
                    marginRight: "10px",
                    marginTop: "30px",
                  }}
                >
                  {error}
                </div>
              )}
            </form>
          </div>
        </Modal>
      </div>
    </div>
  );
};

export default CoinTable;
