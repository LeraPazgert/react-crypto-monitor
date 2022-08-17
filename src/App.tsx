import './App.scss';
import { Routes, Route } from 'react-router-dom';
import CoinDetailsPage from './pages/detailsPage/CoinDetailsPage';
import MainPage from './pages/MainPage';
import Navigation from './components/Navigation/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/assets/:id' element={<CoinDetailsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
