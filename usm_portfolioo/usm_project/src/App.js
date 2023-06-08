import Home from './Home';
import './App.css';
// import ResultPage from './ResultPage';
import {BrowserRouter,Routes,Route} from "react-router-dom";
import React, { Component }  from 'react';
// import Login from './Login';
// import SignUp from './SignUp';
// import Add from './Add';
// import PortfolioAdd from './PortfolioAdd';
import PortfolioHeader from './PortfolioHeader';
// import PortfolioManagement from './PortfolioManagement';
// import ThemeAsset from './ThemeAsset';
// import ThemeResult from './ThemeResult'
// import Asset from './Asset'
// import Holding from './Holding'
// import PortfolioComposition from './PortfolioComposition';
// import PortfolioMain from './PortfolioMain';
import SecurityPage from './SecurityPage';
import Landing from './Landing';
import Navbar from './Navbar';
import background from './Images/background.png';
import Desktop from './Desktop';
import Portpage from './Portpage';
import Addsecurities from './Addsecurities';
import PortfolioAdd from './PortfolioAdd';
import Theme from './Theme';
import AddSecurity from './AddSecurity';
import Addsec from './Addsec';
import Addtheme from './Addtheme';
import Addassets from './Addassets';
import PortfolioTheme from './PortfolioTheme';
import Symbol from './Symbol';



function App() {
  return (
    <div className="App" >
      <>
      <Navbar/>
      </>
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path='/home' element={<Home/>}></Route>
        <Route path='/portpage' element={<Portpage/>}></Route>
        <Route path='/theme' element={<Theme/>}></Route>
        <Route path='/addsec' element={<Addsec/>}></Route>
        <Route path='/addtheme' element={<Addtheme/>}></Route>
        <Route path='/addasset' element={<Addassets/>}></Route>
        <Route path='/addsecurity' element={<AddSecurity/>}></Route>
        <Route path='/symbol' element={<Symbol/>}></Route>
        {/* <Route path='/Isin' element={<Isin/>}></Route> */}
        {/* <Route path='/ResultPage' element={<ResultPage/>}></Route> */}
        {/* <Route path='/add' element={<Add/>}></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/signup' element={<SignUp/>}></Route>
        <Route path='/portfolioadd' element={<PortfolioAdd/>}></Route> */}
        <Route path='/portfolioheader' element={<PortfolioHeader/>}></Route>
        {/* <Route path='/portfoliomanagement' element={<PortfolioManagement/>}></Route>
        <Route path='/themeAsset' element={<ThemeAsset/>}></Route>
        <Route path='/asset' element={<Asset/>}></Route>
        <Route path='/themeresult' element={<ThemeResult/>}></Route>
        <Route path='/holding' element={<Holding/>}></Route> */}
        <Route path='/portfolioadd' element={<PortfolioAdd/>}></Route>
        <Route path='/addsecurities' element={<Addsecurities/>}></Route>
        <Route path='/securitypage' element={<SecurityPage/>}></Route>
        <Route path='/landing' element={<Landing/>}></Route>
        <Route path='/navbar' element={<Navbar/>}></Route>
        <Route path='/desktop' element={<Desktop/>}></Route>
        <Route path='/addsec/:portfolioName' element={<Addsec/>}></Route>
        <Route path='portfoliotheme' element={<PortfolioTheme/>}></Route>
        {/* <Route path='/portfolioComposition' element={<PortfolioComposition/>}></Route>
        <Route path='/portfolioMain' element={<PortfolioMain/>}></Route> */}
      </Routes>
      
    </div>
  );
  }
  export default App;
