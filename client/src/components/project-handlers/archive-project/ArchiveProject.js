import axios from 'axios';
import React, { useState } from "react";
import { StyleSheet, Text } from 'react-native';
import { Link } from 'react-router-dom';
import Transitions from '../../Transitions';
import './ArchiveProject.css';

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
        
    const [projectFileName, setProjectFileName] = useState("");
   
    const handleSubmit = async (event) => {
         // prevents the submit button from refreshing the page
        event.preventDefault();        
        const data = {
            projectFileName: projectFileName
          
        }
        axios
        .post("http://localhost:3001/project/archive", data)
        .then((response) => {
          window.location.replace("/ArchiveProject");
        });
    };
  
    return (
        <Transitions>
            <div className='config'>   
                <div className ='header'>
                    <h4 className='text'>
                        Archive Project
                    </h4>              
                </div>
                <form className='ProjectForm' onSubmit={handleSubmit}>
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
                        <Link to="/">
                            <button className = "cancel" value = "Cancel" > Cancel </button>  
                        </Link>
                    </div>
                </form>
            </div>     
        </Transitions>   

    )
  
}
export default ArchiveProject;
