import React from "react";
import Navbar from "./Navbar";
import './PortfolioHeader.css';
import home from './Images/home.png';
import back from './Images/back.png';
import { useNavigate } from "react-router-dom";
import {useState,useEffect} from 'react';
// import PortfolioHeaderService from './PortfolioHeaderService'
import { Link } from "react-router-dom";
const PortfolioHeader=() => {

    // const navigate=useNavigate();
    //    const [portfolioHeaders,setPortfolioHeaders]=useState([])
    // useEffect(()=>{PortfolioHeaderService.getAll().then(
    //                                     (response)=>{setPortfolioHeaders(response.data)
    //                                                 console.log(response.data) }
    // ).catch(error=>{console.log(error);} )  },[])
    return (
        <div>
            <>
                <Navbar />
            </>
            <div className="background4">
                <div>
                    <div className="background5">
                        <button className="homebut">
                            <img src={home} className="homelogo"></img>
                        </button>
                        <p className="heading">Portfolio</p>
                        <br/>
                        <Link to="/portfolioadd" className="btn btn-primary nb-2">Create Portfolio</Link>
                            <br/>
                            <br/>
                    </div>
                    
                    <div className="background6">
                    
                        <div className="container">
                            
                       
                        
                            <table className="table table-bordered table-striped">
                                <thead>
                                    
                                    <th>Portfolio Name</th>
                                    <th>Base Currency</th>
                                    <th>BenchMark</th>
                                    <th>Investment Theme</th>
                                    <th>FundManager Name</th>
                                    <th>Rebalancing Frequency</th>
                                    <th>Investment Value</th>
                                </thead>
                                {/* <tbody>
                                    {
                                        portfolioHeaders.map(portfolioHeader=><tr key={portfolioHeader.portfolioName}>
                                        
                                            <td>{portfolioHeader.portfolioName}</td>
                                            <td>{portfolioHeader.baseCurrency}</td>
                                            <td>{portfolioHeader.benchMark}</td>
                                            <td>{portfolioHeader.investmentTheme}</td>
                                            <td>{portfolioHeader.fundManagerName}</td>
                                            <td>{portfolioHeader.rebalancingFrequency}</td>
                                            <td>{portfolioHeader.investmentValue}</td>
                                        </tr>)
                                    }
                                </tbody> */}
                            </table>
                          
                        </div>
                       
                                    {/* <div>
                                        <button className="bbt" >
                                            <img src={back} className="backbt"></img>
                                        </button>
                                    </div>
                                    <div className="mbtns">
                                        <button className="cbtn">cancel</button>
                                        <button className="sbtn">Save</button>
                                    </div> */}
                                </div>
                            </div>
                        </div>
                    </div>
                

            
        


    );
}
export default PortfolioHeader;