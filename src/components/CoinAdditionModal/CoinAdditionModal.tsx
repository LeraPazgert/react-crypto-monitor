import "./CoinAdditionModal.scss";
import { ChangeEvent, FormEvent, useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import { useAppDispatch } from "../../hooks/redux";
import { coinAdd } from "../../store/slices/coinCartSlice";
import Modal from "../Modal/Modal";

interface CoinAdditionModalProps {
  id?: string
  symbol?: string
  priceUsd?: string
  name?: string
  active: boolean
  setActive: (active: boolean) => void
}

const CoinAdditionModal = ({ id, symbol, name, priceUsd, active, setActive }: CoinAdditionModalProps) => {
  const dispatch = useAppDispatch();
  const [quantity, setQuantity] = useState<string>("");
  const [error, setError] = useState<string>("");

  useEffect(() => {
    if (!active) {
      setQuantity("");
      setError("");
    }
  }, [error, active]);

  const handleChange = useCallback((event: ChangeEvent<HTMLInputElement>): void => {
    const regex = new RegExp("[a-zA-Z,_:$!%-]");
    if (regex.test(event.target.value) || +event.target.value <= 0) {
      setError("Invalid value");
      setQuantity(event.target.value);
    } else {
      setError("");
      setQuantity(event.target.value);
    }
  }, [setQuantity, setError]);

  const handleAdd = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const addedCoin = {
      quantity: quantity,
      id: uuidv4(),
      name: name,
      symbol: symbol,
      price: Number(quantity) * Number(priceUsd),
    };
    dispatch(coinAdd(addedCoin));
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
          <button type="submit" className="modal-content__btn" disabled={!!error}>
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
