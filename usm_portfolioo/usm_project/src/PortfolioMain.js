import React, { useEffect, useState } from "react";

import Navbar from "./Navbar";
import axios from "axios";
import './PortfolioMain.css'
import { useNavigate } from "react-router-dom";
import home from './Images/home.png';
import add from './Images/add.png';
import del from './Images/del.png';
import edit from './Images/edit.png';
// import { useNavigate } from "react-router-dom";

const PortfolioMain=() =>{
    const navigate= useNavigate();
    const FETCH_URLL="http://localhost:1213/compo/getData"
    const[portfolioData,setportfolioData]=useState([]);

    function getData()
    {
        return axios.get(`${FETCH_URLL}/`);
       
    }

    useEffect(()=>{getData().then(
        (response)=> {setportfolioData(response.data)},
                    
).catch(error=>{console.log(error);} )  },[])
    
    
    
                
        
    

    console.log(portfolioData)

    
    return (
        <div>
            <>
                <Navbar />
            </>
            <div className="background1">
                <button className="hom1">
                    <img src={add} className="homlog1" onClick={()=>navigate('/add')}></img>
                </button>
                <button className="hom2">
                    <img src={del} className="homlog2"></img>
                </button>
                <button className="hom3">
                    <img src={edit} className="homlog3" ></img>
                </button>
                <div>
                    <div className="background2">
                        <button className="homebut">
                            <img src={home} className="homelogo"></img>
                        </button>
                        <p className="heading">Portfolio Management</p>
                    </div>
                    <div className="background3">
                        <div className="rect">
                            <div >
                                <div>
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                
                                                
                                                <th>Portfolio Name</th>
                                                <th>Fund Manager Name</th>
                                                <th>Benchmark</th>
                                                <th>Theme</th>
                                                <th>Investment value</th>
                                                <th>Allocated Value</th>
                                                
                                                
                                                <th>Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                        {portfolioData.map(portfolioDatas=><tr key={portfolioDatas.portfolioName}>
                                            
                                            <td>{portfolioDatas.porfolioName}</td>
                                            <td>{portfolioDatas.fundMangerName}</td>
                                            <td>{portfolioDatas.benchMark}</td>
                                            <td>{portfolioDatas.themeName}</td>
                                            <td>{portfolioDatas.investmentValue}</td>
                                            <td>{portfolioDatas.allocatedValue}</td>
                                            
                                        
                                            <td><button>Edit</button></td>
                                            </tr>)
                                            
                                        }
                                        </tbody>
                                        </table>
                                </div>
                                
                        </div>
                        </div>
                        <div className="landbtns">
                                    <button className="landsave">Save</button>
                                    <button className="landback">Back</button>
                                </div>
                    </div>
                </div>
            </div>
        </div>
    );

}

export default PortfolioMain;