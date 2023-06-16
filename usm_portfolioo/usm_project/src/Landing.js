import React from "react";
import './Landing.css';
import Navbar from "./Navbar";
import edit from './Images/edit.png';
import del from './Images/del.png';
import add from './Images/add.png';
import { useNavigate ,Link } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios"
import Modal from "./Modal";
import EditModal from "./EditModal";


const Landing = () => {
    const navigate = useNavigate();
    const FETCH_URLL = "http://localhost:1244/portfolio/fetchPortfolio"
   
    const [portfolioData, setportfolioData] = useState([]);
    const [linkEnabled,setlinkEnabled]=useState(true);
    const [openModal,setopenModal]=useState(false);
    const [portfolioName,setportfolioName]=useState('');
    const [editModal,setEditModal]=useState(false);
    const [pName,setPortName]=useState('');
    

    function getData() {

        return axios.get(`${FETCH_URLL}/`);
    }


   

    const showModal =(id) =>
    {
        setportfolioName(id)
        setopenModal(true)
        console.log(id)
    }

    console.log(portfolioName)

    const showEditModal =(id) =>
    {
        setPortName(id)
        setEditModal(true)
        console.log(id)
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
                                
                                <th>Status</th>
                                <th>Actions</th>
                                {/* <th>Edit</th> */}
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

                                <td>
                                    
                                     {/* portfolioDatas.linkEnabled ? ( */}
                                    <Link to="/securitypage" state={{portfoliName:portfolioDatas.portfolioName}}>{portfolioDatas.portfolioName}</Link>
                                     {/* ) : ('') */}
                                    </td>

                                <td>{portfolioDatas.fundManagerName}</td>

                                <td>{portfolioDatas.theme.themeName}</td>

                                <td>{portfolioDatas.benchMark}</td>



                                <td>{portfolioDatas.investmentValue}</td>
                                
                                <td>{portfolioDatas.status}</td>







                                <td>
                                    
                                    <button className="delbutton" >
                                        
                                        <img src={del} className="del" 
                                    
                                        onClick={(e)=>showModal(portfolioDatas.portfolioName)}></img>
                                    </button>
                                    <button className="delbutton" >
                                        
                                        <img src={edit} className="del" 
                                    
                                        onClick={(e)=>showEditModal(portfolioDatas.portfolioName)}></img>
                                    </button>
                                    
                                </td>
                                {/* <td> */}
                                    
                                    
                                    
                                {/* </td> */}

                            </tr>)



                            }


                        </tbody>
                        </table>
                        
                    </div>
                </div>
                {openModal && <Modal closeModal={setopenModal} portfolioName={portfolioName}/>}
                {editModal && <EditModal closeEditModel={setEditModal} portfolioName={pName}/>}
                {/* { showModal && (
                                <div className="modal">
                                    <div className="modal-content">
                                        <h1>Modal Title</h1>
                                        <button onClick={closeModal}>Close Modal</button>
                                        </div>
                                        </div>
                            )
                        } */}
               
                <div class="col-md-2">
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Back" style={{marginLeft:"278%",marginTop:"100%"}} onClick={() => navigate('/desktop')} />
                  
              </div>
            </div>
        </div>
    );
}
export default Landing;