import "./CoinCartModal.scss";
import { useState } from "react";
import Modal from "../Modal/Modal";
import CoinCartItem from "../CoinCartItem/CoinCartItem";
import { useAppSelector } from "../../hooks/redux";
import SearchCoin from "../SearchCoin/SearchCoin";
import SwapCoinForm from "../SwapCoinForm/SwapCoinForm";

interface CoinCartModalProps {
  active: boolean
  setActive: (active: boolean) => void
}

const CoinCartModal = ({ active, setActive }: CoinCartModalProps) => {
  const { purchasedCoins } = useAppSelector(state => state.coinsCart);
  const [searchText, setSearchText] = useState<string>("");

  const filteredData = purchasedCoins.filter((el: any) => {
    if (searchText === '' || searchText.length < 3) {
      return el;
    }
    else {
      return (el.name || '').toLowerCase().includes(searchText.toLowerCase());
    }
  })

  return (
    <Modal active={active} setActive={setActive}>
      {!purchasedCoins.length ? (
        <div className="briefcase__empty">Your briefcase is empty</div>
      ) : (
        <>
          <div className="briefcase briefcase__title navigation__briefcase">
            In your briefcase:
          </div>
          <SearchCoin setSearchText={setSearchText} />
          {filteredData.map((item) => (
            <div key={item.id}>
              <CoinCartItem coin={item} />
            </div>
          ))}
          <SwapCoinForm purchasedCoins={purchasedCoins} />
        </>
      )}
    </Modal>
  );
};

export default CoinCartModal;
