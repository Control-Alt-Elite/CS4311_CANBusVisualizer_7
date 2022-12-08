import axios from "axios";
import React, { useState } from "react";
import { StyleSheet, Text } from "react-native";
import { Link } from "react-router-dom";
import Transitions from "../../Transitions";
import "./ProjectInfoHolder.css";
import Button from "react-bootstrap/Button";

const styles = StyleSheet.create({
  baseText: {
    fontFamily: "Serif",
    fontSize: 18,
    color: "white",
    textAlign: "left",
  },
  innerText: {
    color: "red",
  },
});

export default function ProjectInfoHolder(props) {
  const [analystInitials, setAnalystInitials] = useState('');
  const [canConnectorID, setCANConnectorID] = useState('');
  const [vehicleID, setVehicleID] = useState('');
  const [baudRate, setBaudRate] = useState(null);
  const [eventName, setEventName] = useState('');
  const [eventDate, setEventDate] = useState(null);
  const [dbcFileName, setDBCFileName] = useState('');
  const [blacklistFileName, setBlacklistFileName] = useState('');


  const handleSubmit = (event) => {
      // prevents the submit button from refreshing the page
      event.preventDefault();
      const data = {eventName: eventName, eventDate: eventDate, analystInitials: analystInitials, 
          canConnectorID: canConnectorID, vehicleID: vehicleID, baudRate: baudRate, dbcFileName: dbcFileName, blacklistFileName: blacklistFileName};
      axios.post('http://localhost:3001/project/session', data)
          .then((response) => {
          window.location.replace('/SplitView')
      })
  };

  return (
    <Transitions>
      <div className="config">
        <div className="header">
          <h3 className="text">Session Configuration</h3>
        </div>

        <form className='ProjectForm' onSubmit={handleSubmit}>
          {/* Event Name */}
          <Text style={styles.baseText}>
            Event Name
            <Text style={styles.innerText}> ! [Required] </Text>
          </Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={eventName}
              required
              onChange={(event) => setEventName(event.target.value)}
            />
          </div>

          {/* Event Date */}
          <Text style={styles.baseText}>Event Date</Text>
          <div>
            <input
              className="TextBox"
              type="Date"
              value={eventDate}
              onChange={(event) => setEventDate(event.target.value)}
            />
          </div>

          {/* Analyst Initials */}
          <Text style={styles.baseText}>Analyst Initials</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={analystInitials}
              // required
              onChange={(event) =>
                setAnalystInitials(event.target.value.toUpperCase())
              }
            />
          </div>

          {/* CAN Connector ID */}
          <Text style={styles.baseText}>
            CAN Connector ID
            {/* <Text style={styles.innerText}> ! [Required] </Text> */}
          </Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={canConnectorID}
              // required
              onChange={(event) => setCANConnectorID(event.target.value)}
            />
          </div>

          {/* Vehicle ID Number */}
          <Text style={styles.baseText}>Vehicle ID</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={vehicleID}
              // required
              onChange={(event) => setVehicleID(event.target.value)}
            />
          </div>

          

          {/* DBC File */}
          <Text style={styles.baseText}>
            DBC File
            {/* <Text style={styles.innerText}> ! [Required] </Text> */}
          </Text>
          <div>
            <input
              className="TextBox"
              type="file"
              value={dbcFileName}
              // required
              accept=".dbc, .kcd"
              onChange={(event) => setDBCFileName(event.target.value)}
            />
          </div>

          {/* Blacklist File */}
          <Text style={styles.baseText}>
            {" "}
            Blacklist File
            {/* <Text style={styles.innerText}> * [Optional] </Text> */}
          </Text>
          <div>
            <input
              className="TextBox"
              type="file"
              value={blacklistFileName}
              accept=".txt, .json, .csv"
              onChange={(event) => setBlacklistFileName(event.target.value)}
            />
          </div>

          <br></br>
          <div>
            <Button id="continue" value="Create" type="submit">
              {" "}
              Continue{" "}
            </Button>
          </div>
        </form>
      </div>
    </Transitions>
  );
}
