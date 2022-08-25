import { useCallback } from 'react';
import { useAppDispatch } from '../../hooks/redux';
import { ICoinCart } from '../../models/models';
import { coinDeleted } from '../../store/slices/coinCartSlice';

interface CoinCartItemProps {
    coin: ICoinCart
}
const CoinCartItem = ({ coin }: CoinCartItemProps) => {
    const dispatch = useAppDispatch();

    const handleDelete = useCallback((): void => {
        dispatch(coinDeleted(coin.id));
    }, [coin.id, dispatch]);

    return (
        <div>
            <div className="briefcase__wrapper">
                <div className="briefcase__coin">
                    {coin.symbol} {coin.quantity}
                </div>
                <button
                    onClick={handleDelete}
                    className="briefcase__btn"
                >
                    Delete
                </button>
            </div>
        </div>
    );
};

export default CoinCartItem;