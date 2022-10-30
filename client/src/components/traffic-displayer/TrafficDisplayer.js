import React, { useEffect, useState } from "react";
import Table from "react-bootstrap/Table";
import "../project-handlers/open/OpenProject.css";
import Transitions from "../Transitions";

export default function OpenProject(props) {
  const url = "http://localhost:3001/packets";
  const [data, setData] = useState([]);
  //const [getResult, setGetResult] = useState(null);

  /*
  //Get packets from server
  function getPackets(){
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => seGetResult(e.data);
    return () => {
      eventSource.close();     //
    };
  }
*/

  // This works perfectly, but we will have to change it for a handler
  useEffect(() => {
    const eventSource = new EventSource(url);
    eventSource.onmessage = (e) => {
      console.log(e.data);
      const parsedData = JSON.parse(e.data);
      setData((data) => [...data, parsedData]);
    };
  }, []);

  return (
    <Transitions>
      <div id="app" className="container">
        <div className="header">
          <h3 className="text">Traffic Displayer</h3>
        </div>
        <div className="card">
          <div className="card-header">
            <button id="all">Start Traffic</button>
          </div>
          <div className="card-body">
            <div className="input-group">
              <div className="input-group-prepend">
                <span className="input-group-text" id="">
                  Select Project
                </span>
              </div>
              <input
                id="select"
                className="form-control"
                type="text"
                required
              />
              <button id="fetch">Fetch</button>
              <button id="clear">Clear</button>
            </div>
            <div className="alert alert-secondary mt-2" role="alert">
              <Table overflow-auto="true" striped bordered hover variant="dark">
                <thead>
                  <tr>
                    <th>Raw Data</th>
                    <th>Decoded</th>
                  </tr>
                </thead>
                <tbody>
                  {data.map(({ raw, decoded }, index) => (
                    <tr>
                      <td>{raw}</td>
                      <td>{decoded}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </div>
            <br></br>
          </div>
        </div>
      </div>
    </Transitions>
  );
}
