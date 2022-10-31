import axios from 'axios';
import React, { useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-dom';
import "./ProjectConfigurationHolder.css";
import Transitions from './Transitions';

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

export default function ProjectConfiguration (props) {

    //Declare new state variables
    const [projectName, setProjectName] = useState('');
    const [storedLocation, setStoredLocation] = useState('/home/kali');
    
    const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
        const data = {projectName: projectName, storedLocation: storedLocation}
        axios.post('http://localhost:3001/project/new', data)
            .then((response) => {
            window.location.replace('/ProjectInfoHolder')
        });
        console.log(projectName);
    };

    return (
        <Transitions>
        <div className='config'>
            <div className='header'>
                <h2 className='text'>
                    Create New Project
                </h2>
            </div>
            <br></br>
            <form onSubmit={handleSubmit}> 
                <Text style={styles.baseText}>
                    Project Name
                        <Text style={styles.innerText}>  ! [Required] </Text>
                </Text>
                <div>
                    <input className='ProjectName' type='text' value={projectName} required
                        onChange={event => setProjectName(event.target.value)} />
                </div>
                <br></br>
                <Text style={styles.baseText}>
                    Stored Location
                        <Text style={styles.innerText}>  ! [Required] </Text>
                </Text>
                <div>
                    <input className='StoredLocation' type='text' value={storedLocation} required 
                    onChange={event => setStoredLocation(event.target.value)} />
                </div>
                <br></br>
                <div>
                    <button id = "continue" value = "Continue" type = "submit" > Continue </button> 
                    <Link to="/">
                        <button id = "cancel" value = "Cancel" > Cancel </button>  
                    </Link>
                </div>
            </form>
        </div>
    </Transitions> 
    )
}
