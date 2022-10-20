import React, { useState, useEffect } from 'react';
import './OpenProject.css'
import Transitions from './Transitions';
//import axios from 'axios';
import Table from 'react-bootstrap/Table';


const array=[]
export default function OpenProject (props) {

  const url = 'http://localhost:3001/packets';
  const [getResult, setGetResult] = useState(null);
  //const source = new EventSource(url);
  //const eventList = document.querySelector('ul');

  //source.onmessage = e => console.log(e.data);
/*
  //Get packets from server
  function getPackets(){

    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => seGetResult(e.data);
    return () => {
      eventSource.close();
    };

  }

  source.onmessage = (e) => {
    const newElement = document.createElement("li");
  
    newElement.textContent = `${e.data}`;
    eventList.appendChild(newElement);
  };


// This works perfectly on cliente console
  useEffect(() => {
    const eventSource = new EventSource(`${url}`);
    eventSource.onmessage = (e) => console.log(e.data);
    return () => {
      eventSource.close();
    };
  }, []);*/

  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) =>setGetResult(<tr><td>{e.data}</td></tr>);
  }, []);


  return (
    <Transitions>
      <div id="app" className="container">
        <div className='header'> 
          <h3 className='text'>Traffic Displayer</h3>
        </div>
        <div className="card">
            <div className ="card-header">
              <button id="all">Start Traffic</button>
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
              <div className="Table">
                <Table striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th>Raw Data</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getResult}
                  </tbody>
                </Table>
              </div>
              <br></br>
            </div>
        </div>
      </div>
    </Transitions>
  )
}

