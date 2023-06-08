import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
// import reportWebVitals from './reportWebVitals';
 import {BrowserRouter,Routes,Route} from "react-router-dom";
import Back from './Back';
// import "bootswatch/dist/[theme]/bootstrap.min.css";
 //import 'bootstrap/dist/css/bootstrap.min.css'
// import Isin from './Isin';
// import Navbar from './Navbar';
// import Home from './Home';

// import Login from './Login';
// import SignUp from './SignUp';
// import PortfolioManagement from './PortfolioManagement';
// import Addd from './Addd';
// import PortfolioAdd from './PortfolioAdd';
// import PortfolioHeader from './PortfolioHeader';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>

    <BrowserRouter>
      <App/>
    </BrowserRouter> 
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
// reportWebVitals();

