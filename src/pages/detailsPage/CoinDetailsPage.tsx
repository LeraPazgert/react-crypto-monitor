import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCoin } from '../../store/actionCreators';
import './CoinDetailsPage.scss';

const CoinDetailsPage = () => {
    const dispatch = useAppDispatch();
    const { coin, loading } = useAppSelector((state) => state.coinDetail);

    const params = useParams<'id'>();

    useEffect(() => {
        dispatch(fetchCoin(params.id!))
    }, [dispatch, params.id]);

    if (loading) return <p>Loading...</p>

    return (
        <div className="detail-page">
            <div className="container">
                <div className="detail-page__wrapper">
                    <div className="info-details detail-page__info">
                        <div className='info-details__title'>{coin?.name}</div>
                        <div>priceUsd: {coin?.priceUsd}</div>
                        <div>supply: {coin?.supply}</div>
                        <div>marketCapUsd: {coin?.marketCapUsd}</div>
                        <div>symbol: {coin?.symbol}</div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CoinDetailsPage;