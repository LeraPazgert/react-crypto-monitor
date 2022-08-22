import "./CoinAdditionModal.scss";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../hooks/redux";
import { coinAdd } from "../../store/slices/coinCartSlice";
import Modal from "../Modal/Modal";

const CoinAdditionModal = ({ id, symbol, priceUsd, active, setActive }) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    if (active === false) {
      setQuantity("");
      setError("");
    }
  }, [error, active]);

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
      price: Number(quantity) * Number(priceUsd),
    };
    dispatch(coinAdd(addedCoin));
    setQuantity("");
    setActive(false);
  };
  return (
    <Modal active={active} setActive={setActive}>
      <div className="modal-content">
        <h2 className="modal-content__title">Add {id} to your briefcase?</h2>
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
          <button type="submit" className="modal-content__btn" disabled={error}>
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
  );
};

export default CoinAdditionModal;
