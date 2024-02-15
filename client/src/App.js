import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Board from './pages/Board/Board';
import CampaignDetailPage from './components/CampaignDetailPage/CampaignDetailPage';
import Header from './components/Header/Header';
import Footer from './components/Footer/Footer';
import Splash from './components/Splash/Splash';

function App() {
  return (
    <div>
      <BrowserRouter>
        <Header />
        
          <Routes>
            <Route path='/' element= {[<Splash/>, <Board />]}/>
            <Route path='/details/:id' element={<CampaignDetailPage />} />
          </Routes>
        
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
