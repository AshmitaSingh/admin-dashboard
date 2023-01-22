import { useState } from 'react';
import './App.css';
import Sidebar from './components/Sidebar';
import MainContent from './components/contents/MainContent';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import logo from './assets/wowtalent.png';

function App() {
  const [close, setClose] = useState(false);

  return (
    <div className="app">
      {close ? 
      <div className="hamburger-option">
        <img className="company-logo" src={logo} alt="logo" />
        <span className="icon" onClick={() => setClose(false)}><MenuOpenIcon /></span>
      </div> 
      : <Sidebar setClose={setClose}/>}
      <MainContent />
    </div>
  );
}

export default App;
