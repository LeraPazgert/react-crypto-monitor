import CoinTable from "../components/coinTable/CoinTable";
import Header from "../components/header/Header";
import { useEffect } from 'react';
import { useAppDispatch, useAppSelector } from "../hooks/redux";
import { fetchCoins } from "../store/actionCreators";


const MainPage = () => {
    const dispatch = useAppDispatch();
    const { coins, loading, error } = useAppSelector(state => state.coin);

    useEffect(() => {
        dispatch(fetchCoins())
    }, [dispatch]);


    return (
        <>
            <Header />
            <CoinTable coins={coins} />
        </>
    );
};

export default MainPage;
