import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCoins } from '../../store/actionCreators';
import './Header.scss';


const Header = () => {
    const dispatch = useAppDispatch();
    const { coins } = useAppSelector(state => state.coins);
    const popularCoins = coins.slice(0,3);
    
    useEffect(() => {
        dispatch(fetchCoins())
    }, [dispatch]);

    return (
        <div className="header">
            <div className='header__wrapper'>
                {popularCoins.map(({ id, symbol, priceUsd, changePercent24Hr }) => (
                    <div key={id} className="item-header header__item">
                        <img src={`/images/${id}.png`} alt={id} className="item-header__logo" />
                        <div key={id} className="item-header__info">
                            <span className="item-header__name">{symbol}</span>
                            <span
                                className="item-header__change"
                                style={{
                                    color: parseFloat(changePercent24Hr) > 0 ? "rgb(14, 203, 129)" : "red",
                                    fontWeight: 500,
                                }}>
                                {parseFloat(changePercent24Hr).toFixed(2)}%

                            </span>
                        </div>
                        <span className="item-header__price">${parseFloat(priceUsd).toFixed(2)}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Header;