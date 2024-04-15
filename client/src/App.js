import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './pages/Board/Board';
import CampaignDetailPage from './pages/CampaignDetailPage/CampaignDetailPage';

import Footer from './components/Footer/Footer';
import ProfilePage from './pages/ProfilePage/ProfilePage';
import LoginPage from './pages/LoginPage/LoginPage';
import LogoutPage from './pages/LogoutPage/LogoutPage';
import DonationSuccess from './pages/DonationSuccess/DonationSuccess';

function App() {
  return (
    <div>
      <BrowserRouter>

        <Routes>
          <Route path='/logout' element={<LogoutPage />} />
          <Route path='/' element={ <Board />} />
          <Route path='/details/:id' element={<CampaignDetailPage />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/profile' element={<ProfilePage />} />
          <Route path='/donation_success' element={<DonationSuccess/>} />
        </Routes>

        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
