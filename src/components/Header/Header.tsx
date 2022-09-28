import './Header.scss';
import { useAppSelector } from '../../hooks/redux';
import { ICoin } from '../../models/models';

const Header = () => {
    const { coins } = useAppSelector(state => state.coins);
    const popularCoins = coins.slice(0, 3);

    return (
        <div className="header">
            <div className='container'>
                <div className='header__wrapper'>
                    {popularCoins.map(({ id, symbol, priceUsd, changePercent24Hr }: ICoin) => (
                        <div key={id} className="item-header header__item">
                            <img src={`images/${id}.png`} alt={id} className="item-header__logo" />
                            <div key={id} className="item-header__info">
                                <span>{symbol}</span>
                                <span
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
        </div>
    );
};

export default Header;