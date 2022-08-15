import './App.css';
import { Routes, Route } from 'react-router-dom';
import CoinDetailsPage from './pages/CoinDetailsPage';
import MainPage from './pages/MainPage';
import Navigation from './components/navigation/Navigation';

function App() {
  return (
    <div>
      <Navigation />
      <Routes>
        <Route path='/' element={<MainPage />}></Route>
        <Route path='/:id' element={<CoinDetailsPage />}></Route>
      </Routes>
    </div>
  );
}

export default App;
