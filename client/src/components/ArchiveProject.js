import './OpenProject.css'
import Transitions from './Transitions';
import { Text, StyleSheet } from 'react-native';
import {Link} from 'react-router-dom';
import React, { useState } from "react";
import axios from 'axios';

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


const ArchiveProject =()=> {
        
    //Declare new state variables
    // const [projectName, setProjectName] = useState([]); //In case we need it
    // event.preventDefault();
    // const data = {projectName: projectName, storedLocation: storedLocation}
    // axios.post('http://localhost:3001/project/new', data)
    //     .then((response) => {
    //     window.location.replace('/ProjectInfoHolder')
    // });
    // console.log(projectName);
    const [projectFileName, setProjectFileName] = useState("");
    // const handleChange = (e)=>{
    //     setForm({form,[e.target.name]:e.target.value})
    // }

    

    const handleSubmit = async (event) => {
         // prevents the submit button from refreshing the page
        event.preventDefault();
        //attempt to pass file to backend 
        // alert("in handle submit");
        
        
        const data = {
            projectFileName: projectFileName
          
        }
        axios
        .post("http://localhost:3001/project/archive", data)
        .then((response) => {
          window.location.replace("/ArchiveProject");
        });
       
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
                        type="text" 
                        value={projectFileName}
                        // accept=".txt"
                        onChange={(event) => setProjectFileName(event.target.value)}
                        required
                        />
                    </div>    
                    <br></br>
                    <div>
                        <button className="continue" 
                        onClick={handleSubmit} 
                        value = "Create" 
                        type = "submit" > Continue
                         </button> 
                            {/* <Link to="/">
                                <button className = "cancel" value = "Cancel" > Cancel </button>  
                            </Link> */}
                            <Link to="/">
              <button className="cancel" value="Cancel">
                {" "}
                Cancel{" "}
              </button>
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
export default ArchiveProject;

