import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
import icon from '../../assets/icon.svg';
import './App.css';
import { useEffect, useState } from 'react';

const Hello = () => {

  const [license, setLicense] = useState<null | string>(null);
  const [loading, setLoading] = useState(false);

  useEffect(()=>{
    window.electron.ipcRenderer.on('license', (license) => {
      setLicense(license);
      setLoading(false);
    });
  },[])

  function hyperLogin(){
    setLoading(true);
    window.electron.ipcRenderer.sendMessage('hyper-oauth',[]);
  }
  return (
    <div>
      <div className="Hello">
        <img width="200px" alt="icon" src={icon} />
      </div>
      <h1>Hyper Oauth Demo using electron-react-boilerplate</h1>
      <div className="Hello">
        { license ? <h2>License: {license}</h2> : 
          <button onClick={hyperLogin} className={`${loading && "loading"}`}>
            <span role="img" aria-label="books">🔒</span>
            {" "}Login with Hyper
          </button>
        }
      </div>
    </div>
  );
};

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Hello />} />
      </Routes>
    </Router>
  );
}
