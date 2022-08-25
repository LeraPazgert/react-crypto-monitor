import "./CoinCartModal.scss";
import Modal from "../Modal/Modal";
import CoinCartItem from "../CoinCartItem/CoinCartItem";
import { useAppSelector } from "../../hooks/redux";

interface CoinCartModalProps {
  active: boolean
  setActive: (active: boolean) => void
}

const CoinCartModal = ({ active, setActive }: CoinCartModalProps) => {
  const { purchasedCoins } = useAppSelector((state) => state.coinsCart);

  return (
    <Modal active={active} setActive={setActive}>
      {!purchasedCoins.length ? (
        <div className="briefcase__empty">Your briefcase is empty</div>
      ) : (
        <>
          <div className=" briefcase briefcase__title navigation__briefcase">
            In your briefcase:
          </div>
          {purchasedCoins.map((item) => (
            <div key={item.id}>
              <CoinCartItem coin={item} />
            </div>
          ))}
        </>
      )}
    </Modal>
  );
};

export default CoinCartModal;
