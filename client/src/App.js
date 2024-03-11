import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './pages/Board/Board';
import CampaignDetailPage from './components/CampaignDetailPage/CampaignDetailPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Splash from './components/Splash/Splash';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />

        <Routes>
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/' element={[<Splash />, <Board />]} />
          <Route path='/details/:id' element={<CampaignDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
