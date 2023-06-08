import React from "react";
import './Addtheme.css'
import ThemeAssetService from "./ThemeAssetService";
import Swal from "sweetalert2";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

function Addtheme() {

  const navigate = useNavigate();
  const [themeName, setThemeName] = useState('');
  const [assetId, setAssetId] = useState('');
  const [allocation, setAllocation] = useState('');
  const [assetData, setAssetData] = useState('');
  const [themeAssets, setThemeAssets] = useState([])
  const [allocationData,setAllocationData]=useState([]);

  const theme_url = "http://localhost:1244/themeAsset/addThemeAsset"
  const assetFetch_url = "http://localhost:1244/asset/fetchAsset"
  const fetchAllocationBytheme="http://localhost:1244/themeAsset/fetchAssetByTheme"


  let temp=0;

  const handleClick = () => {
    Swal.fire({
      position: 'middle-end',
      icon: 'success',
      title: 'Theme Added',
      showConfirmButton: false,
      timer: 2000
    })
    window.location.reload(false);
  }

  function changethemevalue(e) {
    setThemeName(e.target.value)
    console.log(e.target.value)
    // GetAllocationByTheme(e.target.value);

}

  function Addtheme(assetId, themeAsset) {
    return axios.post(`${theme_url}/` + assetId, themeAsset);
  }

  function fetchAsset() {
    return axios.get(assetFetch_url)
  }
  
  function getAllocation(themeName){
    return axios.get(`${fetchAllocationBytheme}/`+themeName)
  }

  console.log(assetId)

  function GetAllocationByTheme() {
    getAllocation(themeName).then(
        (response) => {
            setAllocationData(response.data)
            console.log(response.data)
        }
    ).catch(error => { console.log(error); })

}


  // const calculateAllocation=(event)=>
  // {
  //   setAllocation(event.target.value)
  //   console.log(allocationData.allocation)
  //   temp=allocationData.allocation+(event.target.value)
  // }

  // console.log(allocationData.allocation)



  const saveThemeAsset = (event) => {
  //   if (temp>100) {
  //     window.alert("YOU DON'T HAVE ENOUGH MONEY TO PROCESS THIS TRANSACTION");
  //     setAllocation("")
  //     return <Addtheme></Addtheme>
  // }
    event.preventDefault()
    const themeAsset = { allocation, themeName, assetId }
    console.log(themeAsset);
    Addtheme(assetId, themeAsset).then(
      (response) => {
        console.log(response.data);
        
        
        handleClick()

      }).catch(
        error => { console.log(error); })
  }

  function theme() {

    ThemeAssetService.fetchTheme().then(
      (response) => {
        setThemeAssets(response.data)
        console.log(response.data)
      }
    ).catch(error => { console.log(error); })
  }

  useEffect(() => {
    fetchAsset().then(

      (response) => { setAssetData(response.data) },

    ).catch(error => { console.log(error); })
  }, [])

  useEffect(() => {
    theme()
    
  }, [])

  
console.log(assetData)




  return (

    <div class="container">
      <div class=" text-center mt-5 ">

        <div className="headtheme" style={{ "marginLeft": "-5%", marginTop: "-2%" }}>
          <h1 style={{ fontWeight: "bold" }}>ADD THEME</h1>
        </div>


      </div>
      <div>
      <label className="labelasset" style={{ marginLeft: "-63%" }}>THEME NAME:</label>
          <input className="placeholder" placeholder="Enter the theme name"
            value={themeName} onChange={changethemevalue} style={{
              marginLeft: "1%",
              borderRadius: "4px ",
              border: "2px solid black",
              width: "190px",
              height: "30px", color: "black",
              fontSize: "18px"
            }}></input>

        <div className="assetdiv" style={{ marginLeft: "41%",marginTop:"-3.2%" }}>
          <label className="labelasset" style={{ marginLeft: "-10%" }}>ASSET:</label>
          <select className="placeholder" value={assetId} onChange={(event) => setAssetId(event.target.value)} style={{
            marginLeft: "1%",
            borderRadius: "4px ",
            border: "2px solid black",
            width: "190px",
            height: "30px",
            fontSize: "18px", color: "black"
          }}>
            <option>----choose assset---</option>
            {
              assetData ? (assetData.map((data, key) => (
                <option value={data.assetId}> {data.assetClass}---{data.subAssetClass}</option>
              ))) : (<>Loading...</>)
            }
          </select>

          <label className="labelasset" style={{ marginLeft: "5%" }}>ALLOCATION:</label>
          <input className="placeholder" placeholder="Enter the allocation"
            value={allocation} onChange={(event)=>setAllocation(event.target.value)} style={{
              marginLeft: "1%",
              borderRadius: "4px ",
              border: "2px solid black",
              width: "190px",
              height: "30px", color: "black",
              fontSize: "18px"
            }}></input>

          
        </div>
        <div class="rowed" style={{ marginTop: "5%", marginLeft: "55%" }}>
          <div class="col-md-6">

            <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Save" style={{ "marginLeft": "-155%" }} onClick={saveThemeAsset} />

          </div>

          <div class="col-md-6">

            <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Cancel" style={{ "marginLeft": "-155%" }} onClick={() => navigate('/desktop')} />

          </div>
        </div>
        <div className="tablediv">
          <table className="table table-bordered">
            <thead style={{ fontSize: "22px", fontWeight: "100", textAlign: "left", "color": "chartreuse" }}>
              <tr>
                <th>Theme Name</th>
                <th>Asset class</th>
                <th>Allocation</th>
              </tr>
            </thead>
            <tbody style={{ fontSize: "18px", textAlign: "left" }}>
              {
                themeAssets.map(themeAsset => <tr key={themeAsset.themeName}>

                  <td>{themeAsset.theme.themeName}</td>
                  <td>{themeAsset.asset.assetClass}</td>
                  <td>{themeAsset.allocation}</td>


                </tr>)}
            </tbody>
          </table>
        </div>
        <div class="col-md-2">

            <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Home" style={{ "marginLeft": "275%","boxSizing":"border-box" }} onClick={()=>navigate('/desktop')} />

          </div>

      </div>


      {/* <div class="row ">
    <div class="col-lg-7 mx-auto">
      <div class="card mt-2 mx-auto p-4 bg-light">
          <div class="card-body bg-light">
     
          <div class = "container">
                           <form id="contact-form" role="form">

          

          <div class="controls">
          <div class="col-md-8">
                      <div class="form-group">
                          <label className="rdit" for="form_lastname" style={{"marginLeft":"30%"}}>Theme Name</label>
                          <input id="form_lastname" type="text" name="surname" class="form-control" style={{"marginLeft":"30%", "width": "50rem"}} placeholder="Enter Theme Name" required="required" data-error="Theme name is required."
                          value={themeName} onChange={(event)=>setThemeName(event.target.value)}/>
                                                          </div><br/><br/>
                  </div>
          
                  <div class="col-md-8">
                      <div class="form-group">
                          <label className="rdit" for="form_lastname" style={{"marginLeft":"30%"}}>Allocation</label>
                          <input id="form_lastname" type="text" name="surname" class="form-control" style={{"marginLeft":"30%", "width": "50rem"}} placeholder="Enter allocation" required="required" data-error="Risk is required." 
                          value={allocation} onChange={(event)=>setAllocation(event.target.value)}/>
                                                          </div>
                  <br/><br/>
              </div>
              <div class="row">
                      <div class="col-md-8">
                          <label className="rdit" for="form_need" style={{"marginLeft":"30%"}}>Asset</label>
                          <select id="form_need" name="need" class="form-control uio" style={{"marginLeft":"31%", "width": "50rem"}} required="required" data-error="Please specify your need."
                          value={assetId} onChange={(event)=>setAssetId(event.target.value)}>
                               <option value="" selected disabled >--Select Your Choice--</option>
                                    {
                                        assetData? (assetData.map((data,key)=>(
                                                <option value={data.assetId}> {data.assetClasses}</option>
                                            ))):(<>Loading...</>)
                                    }
                            </select>
                          
                      </div></div><br/><br/>
              <div class="rowed">
                <div class="col-md-6">
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Save" style={{"marginLeft":"-155%"}} onClick={saveThemeAsset}/>
                  
              </div><br/><br/>
              
                <div class="col-md-6">
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Cancel" style={{"marginLeft":"-155%"}} onClick={()=>navigate('/desktop')}/>
                  
              </div>
        
              </div>


      </div>
       </form>
      </div>
          </div>


  </div>
      

  </div>
  

</div> */}
    </div>
  );
}
export default Addtheme;