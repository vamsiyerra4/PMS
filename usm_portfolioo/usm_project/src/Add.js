import React from "react";
import Navbar from "./Navbar";
import './Holding.css';
import './Add.css';
import home from './Images/home.png';
import back from './Images/back.png';

import { useNavigate } from "react-router-dom";
function Add(){
    const navigate = useNavigate();
    return(
        <div>
            <>
            <Navbar/>
            </>
            <div className="Addback">
            <div className="background5">
            <button className="homebut" onClick={()=>navigate('/portfoliomain')}>
                            <img src={home} className="homelogo"></img>
                        </button>
                        <p className="heading">Portfolio Management</p>
                    </div>
                <div className="Addbut">
                    <button className="Assetbut" onClick={()=>navigate('/asset')}>Add Asset Class</button><br/>
                    <button className="Themebut" onClick={()=>navigate('/themeAsset')}>Add Theme</button><br/>
                    <button className="Portfoliobut" onClick={()=>navigate('/portfolioheader')}>Add Portfolio</button>
                </div> 
                <div className="btnss">
                    <button className="cancelbs" onClick={()=>navigate('/portfoliomain')}>cancel</button>
                    
                </div>
            </div>
        </div>
    );
}
export default Add;