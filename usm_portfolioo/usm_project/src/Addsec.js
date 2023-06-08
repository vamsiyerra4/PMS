import React from "react";
import './Addsec.css'
import { useState,useEffect } from "react";
// import './App.css';
import { useLocation } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import Navbar from "./Navbar";
import { Navigate, useNavigate,useParams } from "react-router-dom";
import MasterService from "./MasterService";
function Addsec() {
    //   $('#exampleModal').on('show.bs.modal', function (e) {
    //      $('body').addClass("example-open");
    //     }).on('hide.bs.modal', function (e) {
    //      $('body').removeClass("example-open");
    //     })
    const BASE_URL="http://localhost:1213/compo/addCompo"

    const[urlValue,setUrlValue]=useState('');
    const[symbol,SetSymbol]=useState('');
    const[equityCategory,setEquityCategory]=useState('');
    const[exchangeName,setExchangeName]=useState('');
    const[units,setUnits]=useState('');
    const[portfolioName,setPortfolioName]=useState('')
    const {pName}=useParams("");
    console.log(pName)
    const navigate= useNavigate();
   

    const handleClick = () => {
        Swal.fire({
            position: 'middle-end',
            icon: 'success',
            title: 'Securities Added',
            showConfirmButton: false,
            timer: 2000
        })
    }

    function changeUrlValue(e){
        setUrlValue(e.target.value);
    }
    function changeEquityCategory(e){
        setEquityCategory(e.target.value);
    }
    function changeExchangeName(e){
        setExchangeName(e.target.value);
    }

    function getSymbol(){
        MasterService.fetchData().then(
                (response)=> {SetSymbol(response.data)}
                )
    }
    function addCompo(portfolioName,urlValue,portfolioComposition)
    {
        return axios.post(`${BASE_URL}/`+portfolioName+`/`+urlValue,portfolioComposition);
       
    }

    const saveComposition=(event)=>{
        event.preventDefault()
   const portfolioComposition={equityCategory,exchangeName,units,portfolioName,symbol}
   console.log(portfolioComposition);
   //{setPrlValue(portfolioComposition.portfolioName)};
    addCompo(portfolioName,urlValue,portfolioComposition).then(
       (response)=> {console.log(response.data);
   }).catch(
       error =>{console.log(error);})
       }

    useEffect(()=>{
        setPortfolioName(pName)
        getSymbol()
       },[])
    

    // const handClick=()=>{
    //     Swal.fire({title:'Cash:30% and Equity:70%',
    //     icon:'info'})
    // }
    return (
        <div>

            <>
                <Navbar />
            </>
            <div class="container">
                <div class=" text-center mt-5 ">

                    <div className="Ahead">
                        <h1 >ADD SECURITIES</h1>
                    </div>


                </div>


                <div class="row ">
                    <div class="col-lg-7 mx-auto">
                        <div class="card mt-2 mx-auto p-4 bg-light">
                            <div class="card-body bg-light">

                                <div class="container">
                                    <form id="contact-form" role="form">



                                        <div class="controls">

                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label for="form_need">Security Name</label>
                                                    <select id="form_need" name="need" class="form-control" required="required" data-error="Please specify your need." 
                                                     value={urlValue} onChange={changeUrlValue}>
                                                        <option value="" selected disabled>--Select Your Choice--</option>
                                                        {
                                symbol? (symbol.map((data,key)=>(
                                        <option value={data.symbol}> {data.symbol}</option>
                                    ))):(<>Loading...</>)
                                }
                                </select>
                          
                                                </div>
                                                <div class="col-md-6">
                                                    <div class="form-group">
                                                        <label for="form_lastname">Units</label>
                                                        <input id="form_lastname" type="text" name="surname" class="form-control" placeholder="Enter units" required="required" data-error="Lastname is required." 
                                                            value={units} 
                                                        onChange={(event)=>setUnits(event.target.value)}/>
                                                    </div>
                                                </div>
                                            </div>
                                            <div class="row">
                                                <div class="col-md-6">
                                                    <label for="form_need">Equity Category</label>
                                                    <select id="form_need" name="need" class="form-control" required="required" data-error="Please specify your need."
                                                    value={equityCategory} onChange={changeEquityCategory}>
                                                        <option value="" selected disabled>--Select Your Choice--</option>
                                                        <option >Small-Cap</option>
                                                        <option >Middle-Cap</option>
                                                        <option >Large-Cap</option>
                                                    </select>

                                                </div>
                                                <div class="col-md-6">
                                                <label for="form_need">Exchange Name</label>
                                                    <select id="form_need" name="need" class="form-control" required="required" data-error="Please specify your need."
                                                    value={exchangeName} onChange={changeExchangeName}>
                                                        <option value="" selected disabled>--Select Your Choice--</option>
                                                        <option >NSE</option>
                                                        <option >LSG</option>
                                                        <option >NASDAQ</option>
                                                    </select>
                                                </div>
                                            </div><br /><br />
                                            <div class="row">



                                                <div class="col-md-12">

                                                    <input type="submit" class="btn btn-success btn-send  pt-2 btn-block 
                          " value="Save" onClick={saveComposition} />

                                                </div><br/><br/>
                                                <div class="col-md-12">

                                                    <input type="submit" class="btn btn-success btn-send  pt-2 btn-block 
                          " value="Cancel" onClick={()=>navigate('/securitypage')} />

                                                </div>

                                            </div>


                                        </div>
                                    </form>
                                </div>
                            </div>


                        </div>


                    </div>


                </div>
            </div>
        </div>
    );
}
export default Addsec;