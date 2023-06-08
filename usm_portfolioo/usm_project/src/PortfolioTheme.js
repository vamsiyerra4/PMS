import React from "react";
import './PortfolioTheme.css';

function PortfolioTheme() {
    return (
        <div>
            <div className="divsec" >
                <div className="ht1">
                    <h1 >ADD THEME</h1>
                </div>
                <div className="sec2">
                    <label className="secn" placeholder="Enter theme name" >THEME NAME:</label>&nbsp;
                    <input className="secname1" typt="number" placeholder="Enter units"
                    ></input>&nbsp;
                    <label className="secn">RISK:</label>&nbsp;
                    <input className="secname1" typt="number" placeholder="Enter risk"
                    ></input>&nbsp;
                    <label className="secn" >INVESTENT HORIZON:</label>&nbsp;
                    <select required="required" className="secname" style={{
                        marginLeft:"1%",
                        borderRadius: "1px ",

                        border: "2px solid black",

                        width: "170px",

                        height: "30px",

                        fontSize: "18px",

                    }} >
                        <option >---Choose option---</option>
                        <option>Short</option>
                        <option>Long</option>

                    </select>


                </div>
            </div>
            {/* <div className="savebutton">
                <button className="savebutton12" >Save</button>
            </div> */}
            <div class="col-md-2 wert" style={{marginTop:"2%",marginLeft:"42%"}}>
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Save"/>
                  
              </div>

            <div>
                <div className="addsehead" style={{marginTop:"5%"}}>
                    {/* <button className="asbutton5">ADD SECURITIES</button> */}
                    {/* <h4>ADD ASSET</h4> */}
                    <h1 className="addassethead">ADD ASSET</h1>

                </div>

                <form>
                <div className="secpages5" >
                    <div className="secpage-51">
                        <span className="secpage-asset5" style={{marginleft:"5%","fontWeight":"bold"}}>THEME NAME:</span>&nbsp;
                        <select required="required" className="secpage-asset-input5" style={{
                            
                            borderRadius: "1px ",

                            border: "2px solid black",

                            width: "200px",

                            height: "30px",

                            fontSize: "18px",
                            color: "black"
                        }} >
                            <option value="" selected disabled >--Select Your Choice--</option>

                        </select>
                        {/* <input className="secpage-asset-input" typt="number"  ></input>&nbsp; */}
                    </div>
                    <div className="secpage-52">
                        <span className="secpage-price5"style={{fontWeight:"bold",marginLeft:"-4%"}}>ASSET CLASS:</span>&nbsp;
                        <input className="secpname3" placeholder="Enter asset class"></input>&nbsp;
                    </div>
                    <div className="secpage-53">
                        <span className="secpage-units5" style={{fontWeight:"bold"}}>ASSET DESCRIPTION:</span>&nbsp;
                        <input className="secpage-units-input" typt="number" placeholder="Enter descripton" ></input>&nbsp;
                    </div>
                    <div className="secpage-54">
                        <label className="secpage-sec5">SUB-ASSET CLASS:</label>&nbsp;
                        <input required="required" className="secpage-sec-down5" placeholder="Enter sub-asset class"></input>

                    </div>
                    <div className="secpage-55">
                        <label className="secpage-equity5">ASSET ALLOCATION:</label>&nbsp;
                        <input required="required" className="secpage-equity-input5" placeholder="Enter asset allocation">
                        </input>
                    </div>
                    {/* <div className="secpage-56">
                        <span className="secpage-exchange5">INVESTENT HORIZON:</span>&nbsp;
                        <select required="required" className="secpage-exchange-input5"  >
                            <option>------Choose option-----</option>
                            <option>NSE</option>
                            <option>NASDAQ</option>
                            <option>LSG</option>
                        </select>
                    </div> */}
                </div>
                </form>
            </div>
            
            {/* <div className="savebutton5">
                <button className="savebutton51"  >Save</button>
            </div> */}
            <div class="col-md-2 wert" style={{marginLeft:"42%",marginTop:"2%"}}>
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Save"/>
                  
              </div><br/><br/>
              
                <div class="col-md-2 wert" style={{marginLeft:"42%",marginTop:"1%"}}>
                      
                      <input type="submit" class="btn btn-success btn-send  pt-2 btn-block" value="Cancel"/>
                  
              </div>
        </div>
    );
}

export default PortfolioTheme;