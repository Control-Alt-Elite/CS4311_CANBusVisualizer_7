import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-dom';
import Transitions from '../../Transitions';
import '../open/OpenProject.css';

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

    const handleSubmit = (event) => {
        // prevents the submit button from refreshing the page
        event.preventDefault();
    };
    
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
                        <input className= 'TextBox' type="file" required/>
                    </div>    
                    <br></br>
                    <div>
                        <button id = "continue" value = "Create" type = "submit" > Continue </button> 
                            <Link to="/">
                                <button id = "cancel" value = "Cancel" > Cancel </button>  
                            </Link>
                    </div>
                </form>
            </div>     
        </Transitions>       
    )
}

