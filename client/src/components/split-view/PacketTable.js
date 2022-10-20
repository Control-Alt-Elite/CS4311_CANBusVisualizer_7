import React from "react";
// import "./PacketTable.css";
import Table from "react-bootstrap/Table";
//import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";

const handleRowClick = () => {
  console.log("Row clicked");
};

const handleIDClick = () =>{
  console.log("ID clicked");
};

const handleTimeClick = () =>{
  console.log("Time clicked");
};

const handleDataClick = () =>{
  console.log("Data clicked");
};

const PacketTable = () => {
    const packets = [
      { id: "1", time: "06:39:24", data: "192.168.1.1" },
      { id: "2", time: "06:40:54", data: "192.168.1.2" },
      { id: "3", time: "06:41:12", data: "192.168.1.3" },
      { id: "4", time: "06:42:16", data: "192.168.1.4" },
      { id: "5", time: "06:42:16", data: "192.168.1.4" },
      { id: "6", time: "06:42:17", data: "192.168.1.4" },
      { id: "7", time: "06:42:18", data: "192.168.1.4" },
      { id: "8", time: "06:42:18", data: "192.168.1.4" },
      { id: "9", time: "06:42:19", data: "192.168.1.4" },
      { id: "10", time: "06:42:20", data: "192.168.1.4" },
      { id: "11", time: "06:42:20", data: "192.168.1.4" },
      { id: "12", time: "06:42:20", data: "192.168.1.4" },
      { id: "13", time: "06:42:20", data: "192.168.1.4" },

    ];
  
    const renderPackets = (packets, index) => {
      return (
        <tr key = {index} class id= 'clickable-row' onClick = {handleRowClick}>
          <td>{packets.id}</td>
          <td>{packets.time}</td>
          <td>{packets.data}</td>
        </tr>
      )
    }
  
    return (
    <div className = "PacketTable">
      <Table striped bordered hover responsive variant = "dark" className="tTable">
        <thead>
          <tr>
          <th class id= 'clickable-id' onClick = {handleIDClick}>ID</th>
            <th class id= 'clickable-time' onClick = {handleTimeClick}>Time</th>
            <th class id= 'clickable-data' onClick = {handleDataClick}>Data</th>
          </tr>
          </thead>
          <tbody>
            {packets.map(renderPackets)}
          </tbody>
        
      </Table>
    </div>
    )
  };

export default PacketTable;