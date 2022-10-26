import React, { useState } from "react";
import "./ProjectInfoHolder.css";
import Transitions from "../Transitions";
import axios from "axios";
import { Text, StyleSheet } from "react-native";
import { Link } from "react-router-dom";

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
  //Declare new state variables
  const [projectName, setProjectName] = useState("");
  const [storedLocation, setStoredLocation] = useState("");
  const [analystInitials, setAnalystInitials] = useState("");
  const [canConnectorID, setCANConnectorID] = useState("");
  const [vehicleID, setVehicleID] = useState("");
  const [baudRate, setBaudRate] = useState(null);
  const [eventName, setEventName] = useState("");
  const [eventDate, setEventDate] = useState(null);
  const [dbcFileName, setDBCFileName] = useState("");
  const [blacklistFileName, setBlacklistFileName] = useState("");

  const handleSubmit = (event) => {
    // prevents the submit button from refreshing the page
    event.preventDefault();
    const data = {
      eventName: eventName,
      eventDate: eventDate,
      analystInitials: analystInitials,
      canConnectorID: canConnectorID,
      vehicleID: vehicleID,
      baudRate: baudRate,
      dbcFileName: dbcFileName,
      blacklistFileName: blacklistFileName,
    };
    axios
      .post("http://localhost:3001/project/session", data)
      .then((response) => {
        window.location.replace("/Sync");
      });
  };

  return (
    <Transitions>
      <div className="config">
        <div className="header">
          <h3 className="text">Session Configuration</h3>
        </div>
        <form onSubmit={handleSubmit}>
          <Text style={styles.baseText}>
            Project Name
            <Text style={styles.innerText}> ! [Required] </Text>
          </Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={projectName}
              required
              onChange={(event) => setProjectName(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>
            Stored Location
            <Text style={styles.innerText}> ! [Required] </Text>
          </Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={storedLocation}
              required
              onChange={(event) => setStoredLocation(event.target.value)}
            />
          </div>

          {/* <Text style={styles.baseText}>Event Name</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={eventName}
              required
              onChange={(event) => setEventName(event.target.value)}
            />
          </div> */}
          <Text style={styles.baseText}>Event Date</Text>
          <div>
            <input
              className="TextBox"
              type="Date"
              value={eventDate}
              required
              onChange={(event) => setEventDate(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>Analyst Initials</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={analystInitials}
              required
              onChange={(event) =>
                setAnalystInitials(event.target.value.toUpperCase())
              }
            />
          </div>
          <Text style={styles.baseText}>CAN Connector ID</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={canConnectorID}
              required
              onChange={(event) => setCANConnectorID(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>Vehicle ID</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={vehicleID}
              required
              onChange={(event) => setVehicleID(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>Baud Rate</Text>
          <div>
            <input
              className="TextBox"
              type="text"
              value={baudRate}
              required
              onChange={(event) => setBaudRate(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>
            {" "}
            Blacklist File
            <Text style={styles.innerText}> * [Optional] </Text>
          </Text>
          <div>
            <input
              className="TextBox"
              type="file"
              value={blacklistFileName}
              accept=".dbc"
              onChange={(event) => setBlacklistFileName(event.target.value)}
            />
          </div>
          <Text style={styles.baseText}>DBC File</Text>
          <div>
            <input
              className="TextBox"
              type="file"
              value={dbcFileName}
              accept=".dbc, .kcd"
              onChange={(event) => setDBCFileName(event.target.value)}
            />
          </div>
          <br></br>
          <div>
            <button id="continue" value="Create" type="submit">
              {" "}
              Continue{" "}
            </button>
            <Link to="/">
              <button id="cancel" value="Cancel">
                {" "}
                Cancel{" "}
              </button>
            </Link>
          </div>
        </form>
      </div>
    </Transitions>
  );
}
