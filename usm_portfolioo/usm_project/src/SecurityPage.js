import React from "react";
import { useNavigate } from "react-router-dom";
import './SecurityPage.css';
import Navbar from "./Navbar";
import { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import PortfolioHeaderService from "./PortfolioHeaderService"
import MasterService from "./MasterService"
const SecurityPage = () => {
    const [equityCategory, setEquityCategory] = useState('');
    const [exchangeName, setExchangeName] = useState('');
    const [units, setUnits] = useState('');
    const [portfolioName, setPortfolioName] = useState('');
    const [symbol, SetSymbol] = useState('');
    const [urlValue, setUrlValue] = useState('');
    const [prlValue, setPrlValue] = useState('');
    const [portfolioDatas, setPortfolioDatas] = useState([]);
    const [portfolioHeaders, setPortfolioHeaders] = useState([]);
    const [availableBalance, setAvailableBalance] = useState();
    const [securityValue, setsecurityValue] = useState('');
    const [portfolioComposition, setPortfolioComposition] = useState('')
    const [quantity, setQuantity] = useState('');
    const [value, setValue] = useState('');
    const [symbolData, setsymbolData] = useState([]);
    const [price, setPrice] = useState('');
    const [assetData, setAssetData] = useState('');
    const [assetId, setAssetId] = useState('');
    const [ExceedError, setExceedError] = useState(false)
    // const[pName,setpName]=useState('');
    const navigate = useNavigate();
    const location = useLocation()
    const portfolName = location.state.data;

    const transferObject = location.state.portfoliName
    let temp = 0;
    var pName;
    var themeName;

    const BASE_URL = "http://localhost:1244/compo/addCompo"
    const GETT_URL = "http://localhost:1244/portfolio/fetchPortfolioByName"
    const FETCHH_URL = "http://localhost:1244/compo/fetchByName"
    const getDataBySym = "http://localhost:1244/master/fetchDataBySymbol"
    const getAssetBytheme = "http://localhost:1244/themeAsset/fetchAssetByTheme"

    if (portfolName === undefined || portfolName === null) {
        pName = transferObject
        console.log('portfolioName')
    } else {
        pName = location.state.data
        console.log('transferObject')
    }

    console.log(pName)


    function changeassetvalue(e) {
        setAssetId(e.target.value)
        getSymbol(e.target.value);

    }


    function changeEquityCategory(e) {
        setEquityCategory(e.target.value);
    }

    function changeExchangeName(e) {
        setExchangeName(e.target.value);
    }

    ///Adding security by portfolioName and security symbol
    function addCompo(pName,assetId, urlValue, portfolioComposition) {
        return axios.post(`${BASE_URL}/` + pName + `/` +assetId+`/`+ urlValue, portfolioComposition);
    }
    function getPortfolioName() {
        PortfolioHeaderService.getAll().then(
            (response) => { setPortfolioName(response.data) })
    }

    function getSymbol(assetId) {
        MasterService.fetchData(assetId).then(
            (response) => {
                SetSymbol(response.data)
                console.log(response.data)
            })
    }
    function getDataBySymbol(symbol) {
        return axios.get(`${getDataBySym}/` + symbol)
    }
    function findByPortfolioName(pName) {
        return axios.get(`${GETT_URL}/` + pName);
    }
    function findByName(pName) {
        return axios.get(`${FETCHH_URL}/` + pName);
    }
    function getAsset(themeName) {
        return axios.get(`${getAssetBytheme}/` + themeName)
    }
    function PortfolioName() {
        findByPortfolioName(pName).then(
            (response) => {
                setPortfolioHeaders(response.data)
                console.log(response.data.investmentTheme)
                getAsset(response.data.investmentTheme).then(
                    (response) => {
                        setAssetData(response.data)
                        console.log(response.data)
                    }
                ).catch(error => { console.log(error); })

            }


        ).catch(error => { console.log(error); })
        GetAssetByTheme()
    }
    function GetByName() {
        findByName(pName).then(
            (response) => {
                setPortfolioDatas(response.data)
                console.log(response.data)
            }
        ).catch(error => { console.log(error); })
    }

    function GetAssetByTheme() {
        getAsset(themeName).then(
            (response) => {
                setAssetData(response.data)
                console.log(response.data)
            }
        ).catch(error => { console.log(error); })

    }







    useEffect(() => {
        PortfolioName()
        // getSymbol()
        getPortfolioName()
        GetByName()



    }, [])

    console.log(portfolioHeaders.investmentValue)
    console.log(portfolioHeaders.investmentTheme)
    console.log(portfolioDatas)
    console.log(pName)
    console.log(symbol)
    console.log(assetData)
    console.log(assetId)


    useEffect(() => {
        findByName(pName).then(
            (response) => {
                setPortfolioDatas(response.data)
                const localComposotionData = response.data;
                console.log(localComposotionData)
                localComposotionData.map((item) => {
                    temp = temp + item.allocatedValue;
                    console.log(temp)

                    setsecurityValue(temp / 2)
                    
                });
                setAvailableBalance(portfolioHeaders.investmentValue - securityValue)
                console.log(portfolioHeaders.investmentValue)
                console.log(availableBalance)



            })
            .catch((error) => {
                console.log(error);
            });
    }, [])


    console.log(temp)
    console.log(availableBalance)


    const selectSymbol = (e) => {
        setUrlValue(e.target.value)
        {
            getDataBySymbol(e.target.value).then(
                (response) => {
                    setsymbolData(response.data)
                    console.log(response.data)
                    setPrice(response.data.lastPrice)
                }

            )
                .catch(error => { console.log(error); })
        }

    }

    console.log(symbolData)
    console.log(symbolData.lastPrice)
    console.log(price)


    const calculateValue = (e) => {
        setUnits(e.target.value);
        setValue(Math.round(e.target.value * symbolData.lastPrice * 100) / 100)
        console.log(portfolioHeaders.investmentValue - securityValue);
        if ((Math.round(e.target.value * symbolData.lastPrice * 100) / 100) >= (portfolioHeaders.investmentValue - securityValue)) {
            setExceedError(true)
        }
        console.log(ExceedError)

    };
    console.log(value)
    console.log(units)

    const saveComposition = (event) => {
        if (ExceedError == true) {
            window.alert("YOU DON'T HAVE ENOUGH MONEY TO PROCESS THIS TRANSACTION");
            setUnits("")
            setExceedError(false)
            return <SecurityPage></SecurityPage>
        }

        event.preventDefault()
        const portfolioComposition = { equityCategory, exchangeName, units, pName, symbol }
        console.log(portfolioComposition);
        { setPrlValue(portfolioComposition.portfolioName) };
        addCompo(pName,assetId, urlValue, portfolioComposition).then(
            (response) => {
                console.log(response.data);
                // navigate('/landing')
            }).catch(
                error => { console.log(error); })
        window.location.reload(false);
        // GetByName();
    }




    return (


        <div className="yfg">

            <div>
                <div class="modal fade" id="orangeModalSubscription" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"
                    aria-hidden="true">
                    <div class="modal-dialog modal-notify modal-warning" role="document">

                        <div class="modal-content">

                            <div class="modal-header text-center">
                                <h4 class="modal-title white-text w-100 font-weight-bold py-2 fdi">Add Securities</h4>
                                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                                    <span aria-hidden="true" class="white-text">&times;</span>
                                </button>
                            </div>


                            <div class="modal-body">
                                <div class="md-form">
                                    <i class="fas fa-user prefix grey-text"></i>

                                    <label data-error="wrong" data-success="right" for="form3">Enter Security</label>
                                    <select class="form-control cod">
                                        <option>Small-Cap</option>
                                        <option>Mid-Cap</option>
                                        <option>Large-Cap</option>
                                    </select>
                                </div><br />
                                <div class="md-form mb-5">
                                    <i class="fas fa-user prefix grey-text"></i>
                                    <label data-error="wrong" data-success="right" for="form3">Units</label>
                                    <input type="text" id="form3" class="form-control validate emailInput"></input>

                                </div>
                                <br />
                                <div class="md-form">
                                    <i class="fas fa-user prefix grey-text"></i>

                                    <label data-error="wrong" data-success="right" for="form3">Exchange</label>
                                    <select class="form-control cod">
                                        <option>NSE</option>
                                        <option>LSEG</option>
                                        <option>NASDAQ</option>
                                    </select>
                                </div></div>
                            <div class="md-form">
                                <i class="fas fa-user prefix grey-text"></i>

                                <label data-error="wrong" data-success="right" for="form3">Equity Category</label>
                                <select class="form-control cod">
                                    <option>Small-Cap</option>
                                    <option>Mid-Cap</option>
                                    <option>Large-Cap</option>
                                </select>
                            </div><br />
                            <div class="modal-footer justify-content-center">
                                <button type="button" class="btn btn-success">Save</button>
                                <button type="button" class="btn btn-danger">Cancel</button>
                            </div>
                        </div>

                    </div>
                </div>

                <div class="text-center">
                    {/* <a href="" class="btn btn-default btn-rounded" data-toggle="modal" data-target="#orangeModalSubscription">Launch
                    modal Subscription</a> */}
                    <div className="main_div">
                        <div className="center_div">
                            <button Class="balance"><h4 Class="ab">AVAILABLE BALANCE</h4> &nbsp;
                                {portfolioHeaders.investmentValue - securityValue}</button>
                            <button class="balance1"><h4 class="a">INVESTED VALUE</h4>
                                {portfolioHeaders.investmentValue}
                            </button>
                        </div>
                    </div>


                </div>
            </div>
            <div>
                <div class="container21">
                    <table class="table table-bordered">
                        <thead className="header21">
                            <tr>
                                <th>Portfolio Name</th>
                                <th>Base Currency</th>
                                <th>Benchmark</th>
                                <th>Investment Theme</th>
                                <th>Rebalancing Frequency</th>
                                <th>Investment Value</th>
                            </tr>
                        </thead>
                        <tbody className="body21">
                            {
                                <tr key={portfolioHeaders.portfolioName}>

                                    <td>{portfolioHeaders.portfolioName}</td>
                                    <td>{portfolioHeaders.baseCurrency}</td>
                                    <td>{portfolioHeaders.benchMark}</td>
                                    <td>{portfolioHeaders.investmentTheme}</td>

                                    <td>{portfolioHeaders.rebalancingFrequency}</td>
                                    <td>{portfolioHeaders.investmentValue}</td>
                                </tr>
                            }
                        </tbody>

                    </table>
                </div>
                <div>
                    <div>
                        {/* <h4>ADD SECURITIES</h4> */}
                        <button className="asbutton">ADD SECURITIES</button>

                    </div>


                    <div className="secpages">
                        <div className="secpage-1">
                            <span className="secpage-asset" style={{ fontWeight: "bold" }}>Asset:</span>&nbsp;
                            <select required="required" className="secpage-sec-down" value={assetId} onChange={changeassetvalue} >
                                <option value="" selected disabled >--Select Your Choice--</option>
                                {
                                    assetData ? (assetData.map((data, key) => (
                                        <option value={data.asset.assetId}> {data.asset.assetClass}</option>
                                    ))) : (<>Loading...</>)
                                }
                            </select>
                        </div>
                        <div className="secpage-2">
                            <span className="secpage-price" style={{ fontWeight: "bold" }}>Price:</span>&nbsp;
                            <input style={{ "color": "black" }} value={(symbolData.lastPrice)}></input>
                            &nbsp;
                        </div>
                        <div className="secpage-3">
                            <span className="secpage-units" style={{ fontWeight: "bold" }}>Units:</span>&nbsp;
                            <input className="secpage-units-input" typt="number" style={{ color: "black" }} placeholder="Enter units" value={units} onChange={calculateValue}></input>&nbsp;
                        </div>
                        <div className="secpage-4">
                            <span className="secpage-sec" style={{ fontWeight: "bold" }}>Search Securities:</span>&nbsp;
                            <select required="required" className="secpage-sec-down" value={urlValue} onChange={selectSymbol}>
                                <option value="" selected disabled >--Select Your Choice--</option>
                                {
                                    symbol ? (symbol.map((data, key) => (
                                        <option value={data.symbol}> {data.symbol}</option>
                                    ))) : (<>Loading...</>)
                                }
                            </select>
                        </div>
                        <div className="secpage-5">
                            <span className="secpage-equity" style={{ fontWeight: "bold" }}>Equity Category:</span>&nbsp;
                            <select required="required" className="secpage-equity-input" value={equityCategory} onChange={changeEquityCategory}>
                                <option>-----Choose option-----</option>
                                <option>Small-Cap</option>
                                <option>Medium-cap</option>
                                <option>Large-Cap</option>
                            </select>
                        </div>
                        <div className="secpage-6">
                            <span className="secpage-exchange" style={{ fontWeight: "bold" }}>Exchange:</span>&nbsp;
                            <select required="required" className="secpage-exchange-input" value={exchangeName} onChange={changeExchangeName}>
                                <option>------Choose option-----</option>
                                <option>NSE</option>
                                <option>NASDAQ</option>
                                <option>LSG</option>
                            </select>
                        </div>
                    </div>
                </div>
                <div className="savebutton">
                    <button className="savebutton1" onClick={saveComposition} >Save</button>
                </div>
                {/* <div>
                    <button className="add" onClick={()=>navigate(`/addsec/${portfolioHeaders.portfolioName}`)}>Add Securities</button>
                    
                </div> */}

                <div class="container22">
                    <table class="table table-bordered">
                        <thead className="header22">
                            <tr>
                                <th>Security Name</th>
                                

                                <th>Equity Category</th>
                                <th>Exchange Name</th>
                                <th>Units</th>
                                <th>Price</th>
                                <th>Allocated Value</th>
                                <th>Transaction Date</th>
                                {/* <th>Actions</th> */}
                                {/* <th>Total Transactions</th> */}
                                {/* <th>Available Balance</th>
                                <th>Invested Amount</th> */}
                            </tr>
                        </thead>
                        <tbody className="body22">
                            {
                                portfolioDatas.map(portfolioData => <tr key={portfolioData.portfolioName}>


                                    <td>{portfolioData.securityName}</td>
                                    <td>{portfolioData.equityCategory}</td>
                                    <td>{portfolioData.exchangeName}</td>
                                    <td>{portfolioData.units}</td>
                                    <td>{portfolioData.price}</td>
                                    <td>{Math.round(portfolioData.allocatedValue)}</td>
                                    <td>{portfolioData.transactionDate}</td>
                                    {/* <td>{<button>sell</button>}</td> */}
                                    {/* <td>{Math.round(portfolioData.totalTransaction)}</td> */}
                                    {/* <td>{portfolioHeaders.investmentValue-availableBalance}</td>
                                                <td>{portfolioData.investmentValue}</td> */}
                                    {/* <td>{portfolioData.portfolioHeader.portfolioName}</td>  */}



                                </tr>)}

                        </tbody>

                    </table>
                </div>
            </div>
            <div className="buttons1">
                <button className="ba" onClick={() => navigate('/portfolioadd')}>Back</button>
                <button className="ne" onClick={() => navigate('/landing')}>Save</button>
            </div>
        </div>
    );
}
export default SecurityPage;