import React, { useState } from 'react';
import './OpenProject.css'
import Transitions from './Transitions';
import axios from 'axios';


export default function OpenProject (props) {

  const url = 'http://localhost:3001/packets';
  const [getResult, setGetResult] = useState(null);

  //Format project information
  function formatResponse(res) {
    return JSON.stringify(res, null, " ");
  }

  //Get packets from server
  async function getPackets(){
    try{
      const response = await axios.get(url)
        setGetResult(formatResponse(response.text));
    } catch(err) {
      setGetResult(formatResponse(err.response?.data || err));
    }
  }

  return (
    <Transitions>
      <div id="app" className="container">
        <div className='header'> 
          <h3 className='text'>Traffic Displayer</h3>
        </div>
        <div className="card">
            <div className ="card-header">
              <button id="all" onClick={getPackets}>Start Traffic</button>
            </div>
            <div className="card-body">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">Select Project</span>
                </div>
                <input id="select" className="form-control" type="text" required/>
                <button id="fetch">Fetch</button>                     
                <button id="clear" >Clear</button>
              </div>
              { getResult && <div className="alert alert-secondary mt-2" role="alert"><pre>{getResult}</pre></div> }
              <br></br>
            </div>
        </div>
      </div>
    </Transitions>
  )
}

