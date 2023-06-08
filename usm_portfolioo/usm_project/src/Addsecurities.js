import React from "react";
//import './Addsecurities.css'

import { useState } from "react";
import Swal from "sweetalert2";
function Addsecurities() {

    const handleClick=()=>{
        Swal.fire({
            position: 'middle-end',
            icon: 'success',
            title: 'Securities Added',
            showConfirmButton: false,
            timer: 2000
          })
    }

    // const handClick=()=>{
    //     Swal.fire({title:'Cash:30% and Equity:70%',
    //     icon:'info'})
    // }
    return(
        <div className="backg">
        
<button type="button" class="btn btn-primary" data-toggle="modal" data-target="#exampleModalCenter">
  Add Securities
</button>

<div class="modal fade" id="exampleModalCenter" tabindex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
  <div class="modal-dialog modal-dialog-centered" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <h5 class="modal-title" id="exampleModalLongTitle">Add Securities</h5>
        <button type="button" class="close" data-dismiss="modal" aria-label="Close">
          <span aria-hidden="true">&times;</span>
        </button>
      </div>
      <div class="modal-body">
      {/* <div className="lc">

<label className="text2"> </label>&nbsp;

<input className="pill" placeholder="Enter unique name"></input><br />

</div>
<div className="lc">

<label className="text2">Fund Manager: </label>&nbsp;

<input className="pill" placeholder="Enter unique name"></input><br /> */}

<div className="pc">

                                            <label className="text2">Security Name </label>&nbsp;

                                            <select className="selections">

                                                <option>INR</option>

                                                <option>USD</option>

                                                <option>GBP</option>

                                            </select><br />
      </div>
      <div className="pc1">

                                            <label className="text2">EQUITY CATEGORY</label>&nbsp;

                                            <select className="selections">

                                                <option>Small-Cap</option>

                                                <option>Mid-Cap</option>

                                                <option>Large-Cap</option>

                                            </select><br />
      </div>
      <div className="lc">

<label className="text2">Units </label>&nbsp;

<input className="pill" placeholder="Enter units"></input><br />
</div>
<div className="lc">

<label className="text2">INVESTED VALUE</label>&nbsp;

<input className="pill" placeholder="Enter price"></input><br /><br/>
</div>
      <div class="modal-footer">
        <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
        <button type="button" class="btn btn-primary" onClick={handleClick}>Save changes</button>
      </div>
    </div>
  </div>
</div>
        </div></div>
    );
}

export default Addsecurities;