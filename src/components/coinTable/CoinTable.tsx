
import { ICoin } from '../../models/models';
import './CoinTable.scss';

interface CoinTableCardProps{
    coins: ICoin[]
}
const CoinTable = ({coins}:CoinTableCardProps) => {
    return (
        <table className='coins-table'>
            <caption>Cryptocurrency Prices by Market Cap</caption>
            <div className='container'>
                <thead>
                    <tr>
                        <th>Rank</th>
                        <th>Coin</th>
                        <th>Price (USD)</th>
                        <th>Market Cap</th>
                    </tr>
                </thead>

                <tbody>
                    {coins.map(({id, name, rank, priceUsd, marketCapUsd}) => (
                        <tr key={id}>
                            <td>{rank}</td>
                            <td>{name}</td>
                            <td>${parseFloat(priceUsd)}</td>
                            <td>${parseFloat(marketCapUsd)}</td>
                        </tr>
                    ))}
                </tbody>
            </div>
        </table>

    );
};

export default CoinTable;



