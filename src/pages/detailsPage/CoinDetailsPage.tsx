import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import CoinChart from '../../components/CoinChart/CoinChart';
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

                <div className="info-details detail-page__info">
                    <div className='info-details__title'>{coin?.name}</div>
                    <div className='info-details__wrapper'>
                        <span className='info-details__param'>symbol:</span>
                        {coin?.symbol}
                    </div>
                    <div className='info-details__wrapper'>
                        <span className='info-details__param'>price USD:</span>
                        {coin?.priceUsd.slice(0, 8)} $
                    </div>
                    <div className='info-details__wrapper'><span className='info-details__param'>supply:</span> {coin?.supply.slice(0, 12)}</div>
                    <div className='info-details__wrapper'><span className='info-details__param'>market cap USD:</span> {coin?.marketCapUsd.slice(0, 15)}</div>
                    <div className='info-details__wrapper'>change percent 24Hr:
                        <span style={{
                            color:
                                Number(coin?.changePercent24Hr) > 0
                                    ? "rgb(14, 203, 129)"
                                    : "red",
                            fontWeight: 500,
                            marginLeft: 100
                        }}>
                            {coin?.changePercent24Hr.slice(0, 5)} %
                        </span> </div>
                </div>

                <div className='info-details__chart'>
                    <CoinChart id={coin?.id} />
                </div>
            </div>
        </div>
    );
};

export default CoinDetailsPage;