import CoinTable from "../components/CoinTable/CoinTable";
import Header from "../components/Header/Header";
import { useAppSelector } from "../hooks/redux";

const MainPage = () => {
    const { loading, error } = useAppSelector((state) => state.coins);
    return (
        <>
            {loading && <p style={{ textAlign: 'center', fontSize: 'large' }}>Loading...</p>}
            {error && <p style={{ textAlign: 'center', fontSize: 'large', color: 'red' }}>{error}</p>}
            <Header />
            <CoinTable />
        </>
    );
};

export default MainPage;
