import React from "react";
import './Landing.css';
import Navbar from "./Navbar";
import edit from './Images/edit.png';
import del from './Images/del.png';
import add from './Images/add.png';
import { useNavigate ,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"


const Landing = () => {
    const navigate = useNavigate();
    //const FETCH_URLL = "http://localhost:1215/compo/getData"
    const FETCH_URLL = "http://localhost:1244/portfolio/fetchPortfolio"
    const [portfolioData, setportfolioData] = useState([]);
    

    const handleDelete=(portfolioName)=>
    {
        const updatedItems = portfolioData.filter(portfolioDatas => portfolioDatas.portfolioName !== portfolioName);
        setportfolioData(updatedItems);
    }

    // const TableRow = ({data}) => {
    //     const [linkClicked,setLinkClicked] = useState(false);
    //     const handleClick = () => {
    //         setLinkClicked(true);
    //     }
    // };

    // const SoftDeleteLink = ({ to, isDeleted}) =>
    // {
    //     const [ disabled, setDisabled] = 
    // }

    function getData() {

        return axios.get(`${FETCH_URLL}/`);



    }

    


    useEffect(() => {
        getData().then(

            (response) => { setportfolioData(response.data) },



        ).catch(error => { console.log(error); })
    }, [])



    console.log(portfolioData)
    return (
        <div>

            <div >
                <div>
                    <button className="addbutton1">
                        <img src={add} className="add1" onClick={() => navigate('/portfolioadd')}></img>
                    </button>
                </div>
                <div className="pm">
                    {/* <h1>Portfolio Management</h1> */}
                    <button className="pmbutton">Portfolio Management</button>
                </div>
                <div>
                    <div class="container">

                        <table class="table table-bordered">
                            <thead className="header1">
                            <tr>
                                <th>Portfolio Name</th>
                                <th>Fund Manager</th>
                                <th>Theme Name</th>
                                <th>Benchmark</th>
                                <th>Invested Value</th>
                                <th>Actions</th>
                            </tr>
                            </thead>
                            <tbody className="body1">
                            {portfolioData.map(portfolioDatas => <tr key={portfolioDatas.portfolioName}>

                                {/* <td>
                                    {linkClicked ? (
                                        <span>{data.link}</span>
                                    ):(
                                        <Link to={securitypage} >{data.link}</Link>
                                    )}
                                </td> */}

                                <td><Link to="/securitypage" state={{portfoliName:portfolioDatas.portfolioName}}>{portfolioDatas.portfolioName}</Link></td>

                                <td>{portfolioDatas.fundManagerName}</td>

                                <td>{portfolioDatas.theme.themeName}</td>

                                <td>{portfolioDatas.benchMark}</td>



                                <td>{portfolioDatas.investmentValue}</td>







                                <td>
                                    {/* <button className="editbutton">
                                        <img src={edit} className="edit"></img>
                                    </button> */}
                                    <button className="delbutton" onClick={()=>handleDelete(portfolioDatas.portfolioName)}>
                                        <img src={del} className="del"></img>
                                    </button>
                                </td>

                            </tr>)



                            }


                        </tbody>
                        </table>
                    </div>
                </div>
                {/* <div class="container">
                    <table class="table table-bordered">
                        <thead className="head">
                            <tr>
                                <th>Portfolio Name</th>
                                <th>Fund Manager</th>
                                <th>Theme Name</th>
                                <th>Benchmark</th>
                                <th>Investement Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {portfolioData.map(portfolioDatas => <tr key={portfolioDatas.portfolioName}>



                                <td>{portfolioDatas.porfolioName}</td>

                                <td>{portfolioDatas.fundMangerName}</td>

                                <td>{portfolioDatas.themeName}</td>

                                <td>{portfolioDatas.benchMark}</td>



                                <td>{portfolioDatas.investmentValue}</td>







                                <td>
                                    <button className="editbutton">
                                        <img src={edit} className="edit"></img>
                                    </button>
                                    <button className="delbutton">
                                        <img src={del} className="del"></img>
                                    </button>
                                </td>

                            </tr>)



                            }


                        </tbody>
                    </table>
                </div> */}
                {/* <button className="back" onClick={() => navigate('/desktop')}>Back</button> */}
                <div class="col-md-2">
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Back" style={{marginLeft:"278%",marginTop:"100%"}} onClick={() => navigate('/desktop')} />
                  
              </div>
            </div>
        </div>
    );
}
export default Landing;