import Home from './Home';
import './App.css';

import {BrowserRouter,Routes,Route} from "react-router-dom";
import React, { Component }  from 'react';
import SecurityPage from './SecurityPage';
import Landing from './Landing';
import Navbar from './Navbar';
import background from './Images/background.png';
import Desktop from './Desktop';
import PortfolioAdd from './PortfolioAdd';
import Addtheme from './Addtheme';
import Addassets from './Addassets';
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
        <Route path='/addtheme' element={<Addtheme/>}></Route>
        <Route path='/addasset' element={<Addassets/>}></Route>
        <Route path='/symbol' element={<Symbol/>}></Route>
        <Route path='/portfolioadd' element={<PortfolioAdd/>}></Route>
        <Route path='/securitypage' element={<SecurityPage/>}></Route>
        <Route path='/landing' element={<Landing/>}></Route>
        <Route path='/navbar' element={<Navbar/>}></Route>
        <Route path='/desktop' element={<Desktop/>}></Route>
        
      </Routes>
      
    </div>
  );
  }
  export default App;
