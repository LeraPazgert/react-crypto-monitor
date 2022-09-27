import { useCallback, useState } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { ICoinCart } from '../../models/models';
import { coinDeleted } from '../../store/slices/coinCartSlice';
import { Tooltip } from "@mui/material";

interface CoinCartItemProps {
    coin: ICoinCart
}
const CoinCartItem = ({ coin }: CoinCartItemProps) => {
    const [active, setActive] = useState(false);
    const dispatch = useAppDispatch();

    const handleDelete = useCallback((): void => {
        dispatch(coinDeleted(coin.id));
    }, [coin.id, dispatch]);

    const handleShowFullAmount = () => {
        setActive(!active);
    };

    return (
        <div>
            <div className="briefcase__main-wrapper">

                <div className="briefcase__coin">
                    {coin.symbol} {active ? coin.quantity : coin.quantity.toFixed(3)}
                </div>
                <div className="briefcase__wrapper">
                    <Tooltip title='Show full amount' arrow>
                        <button className="briefcase__button-show" onClick={handleShowFullAmount}>
                            <img src="https://img.icons8.com/ios-glyphs/60/000000/visible--v1.png" alt='full amount' />
                        </button>
                    </Tooltip>
                    <Tooltip title='Remove from wallet' arrow>
                        <button
                            onClick={handleDelete}
                            className="briefcase__button-delete"
                        >
                            Delete
                        </button>
                    </Tooltip>

                </div>

            </div>
        </div>
    );
};

export default CoinCartItem;