import React from "react";
// import "./PacketTable.css";
import Table from "react-bootstrap/Table";
//import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";


const PacketTable = () => {
    const packets = [
      { id: "1", time: "6:39", data: "192.168.1.1" },
      { id: "2", time: "6:40", data: "192.168.1.2" },
      { id: "3", time: "6:41", data: "192.168.1.3" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },
      { id: "4", time: "6:42", data: "192.168.1.4" },

    ];
  
    const renderPackets = (packets, index) => {
      return (
        <tr key = {index}>
          <td>{packets.id}</td>
          <td>{packets.time}</td>
          <td>{packets.data}</td>
        </tr>
      )
    }
  
    return (
    <div className = "PacketTable">
      <Table striped bordered hover responsive variant = "dark">
        <thead>
          <tr>
            <th>ID</th>
            <th>Time</th>
            <th>Data</th>
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