import './OpenProject.css'
import Transitions from './Transitions';
import { Text, StyleSheet } from 'react-native';
import {Link} from 'react-router-dom';
import React, { useState } from "react";

const styles = StyleSheet.create({
    baseText: {
        fontFamily: 'Serif',
        fontSize: 18,
        color: 'white',
        textAlign: 'left'
    },
    innerText: {
        color: 'red'
      }
  });


export default function OpenProject (props) {
        
    //Declare new state variables
    // const [projectName, setProjectName] = useState([]); //In case we need it
    const [projectFileName, setProjectFileName] = useState("");

    const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
    };
    // const handleSubmit = (event) => {
    //     // prevents the submit button from refreshing the page
    //     event.preventDefault();
    //     const data = {
    //       eventName: eventName,
    //       eventDate: eventDate,
    //       analystInitials: analystInitials,
    //       canConnectorID: canConnectorID,
    //       vehicleID: vehicleID,
    //       baudRate: baudRate,
    //       dbcFileName: dbcFileName,
    //       blacklistFileName: blacklistFileName,
    //     };
    //     axios
    //       .post("http://localhost:3001/project/session", data)
    //       .then((response) => {
    //         window.location.replace("/Sync");
    //       });
    //   };
    
    return (
        <Transitions>
            <div className='config'>   
                <div className ='header'>
                    <h4 className='text'>
                        Archive Project
                    </h4>              
                </div>
                <form onSubmit={handleSubmit}>
                    <Text style={styles.baseText}>
                        Select Project
                    </Text>
                    <div>
                        <input className= 'TextBox' 
                        type="file" 
                        value={fileName}
                        onChange={(event) => setProjectFileName(event.target.value)}
                        required
                        />
                    </div>    
                    <br></br>
                    <div>
                        <button className="continue" value = "Create" type = "submit" > Continue </button> 
                            <Link to="/">
                                <button className = "cancel" value = "Cancel" > Cancel </button>  
                            </Link>
                    </div>
                </form>
            </div>     
        </Transitions>   

    )
    // <div>
    //         <input
    //           className="TextBox"
    //           type="file"
    //           value={blacklistFileName}
    //           accept=".dbc"
    //           onChange={(event) => setBlacklistFileName(event.target.value)}
    //         />
    //       </div>
}

