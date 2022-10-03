import React, { Component } from 'react';
import './ProjectConfigurationHolder.css';
import Transitions from './Transitions';
import { Text, StyleSheet } from 'react-native';

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

const defaultState = {
    projectName: '',
    storedLocation: ''
};

class ProjectConfigurationHolder extends Component {

    constructor(props) {
        super(props)
        this.state = defaultState;
        this.handleSubmit = this.handleSubmit.bind(this);
    }


    handleProjectName = (event) => {
        this.setState({
            projectName: event.target.value,
        })
    }

    handleStoredLocation = (event) => {
        this.setState({
            storedLocation: event.target.value
        })
    }

    handleSubmit = (event) => {
        console.log(`${this.state.projectName} has logged in with connector id: ${this.state.storedLocation}`);
        event.preventDefault()
        let path = '/SessionConfigurationHolder'
        this.props.history.push(path);
    }

    handleCancelClick = () => {
        this.setState({projectName: '', storedLocation: ''});
      }

    render() {
        const { projectName,storedLocation } = this.state

        return (
            <Transitions>
                <div className='config'>           
                            <h3 style={{color: 'white'}}>
                                Create New Project
                            </h3>
                    <form onSubmit={this.handleSubmit}> 
                        <div className='configForm'>
                            <Text style={styles.baseText}>
                                Project Name
                                <Text style={styles.innerText}>  * [Required] </Text>
                            </Text>
                            <input className='ProjectName' type='text' value={projectName} required
                            onChange={this.handleProjectName} />
                            <br></br>
                            <br></br>
                            <Text style={styles.baseText}>
                                Stored Location
                                <Text style={styles.innerText}>  * [Required] </Text>
                            </Text>
                            <div>
                                <input className='StoredLocation' type='text' value={storedLocation} required       
                                onChange={this.handleStoredLocation} />
                                <button id = "browse" > Browse </button> 
                                <input className='Browse' type="file" style={{display:'none'}} />
                                
                            </div>
                            <br></br>
                            <br></br>
                            <button id = "continue" value = "Continue" type = "submit" > Continue </button> 
                            &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            <button id = "cancel" onClick={this.handleCancelClick} value = "Cancel" > Cancel </button>  
                        </div>
 
                    </form>
                </div>
            </Transitions>           
        )
        
    }
    
}

export default ProjectConfigurationHolder;