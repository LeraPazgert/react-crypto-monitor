import "./CoinCartModal.scss";
import { useAppDispatch, useAppSelector } from "../../hooks/redux";
import { coinDeleted } from "../../store/slices/coinCartSlice";
import Modal from "../Modal/Modal";

interface CoinCartModalProps {
  active: boolean
  setActive:(active: boolean)=>void
}

const CoinCartModal = ({ active, setActive }: CoinCartModalProps) => {
  const dispatch = useAppDispatch();
  const { purchasedCoins } = useAppSelector((state) => state.coinsCart);

  const handleDelete = (id: string) => {
    dispatch(coinDeleted(id));
  };
  return (
    <Modal active={active} setActive={setActive}>
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
  );
};

export default CoinCartModal;
