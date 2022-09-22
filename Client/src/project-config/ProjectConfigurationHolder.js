import React, { Component } from 'react';
import '././ProjectConfigurationHolder.css';
// import {useNavigate} from "react-router-dom";
import axios from 'axios';


class ProjectConfigurationHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            storedLocation: '',
        }
    }
    

    handleProjectName = (event) => {
        this.setState({
            projectName: event.target.value
        })
    }

    handleStoredLocation = (event) => {
        this.setState({
            storedLocation: event.target.value
        })
    }
    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
    handleSubmit = event => {
        const {projectName, storedLocation} = this.state;
        axios.post('http://localhost:3001/project/new', {projectName: projectName,
        storedLocation: storedLocation})
        .then((response) => {
            console.log(response);
        })
        event.preventDefault();
    }
    
    render() {
        const { projectName,storedLocation } = this.state

        return (
            
            <div className='config'>

                <div className='configTitle'>
                    <label >Create New Project</label>
                </div>
               
                {/* <div className='container'> */}
                <form onSubmit={this.handleSubmit}>
                    
                    
                    <div>
                        <label className='configLabel'>Project Name</label>
                        <label className='configLabel'style={{color:'red'}}>Required</label>
                        <input className='configInput' type="text" value={projectName} onChange={this.handleProjectName} />
                    </div>
                    <div>
                        <label className='configLabel'>Stored Location</label>
                        <label className='configLabel'style={{color:'red'}}>Required</label>
                        <div className='buttonInput'>
                            <input className='input' type="text" value={storedLocation} onChange={this.handleStoredLocation} />  
                        </div>
                    </div>
                    <div>
                           <input id = "continue" value = "Continue" type='submit'/>
                        </div>
                    <br />
                    <form>
                        
                        <br />
                        <div>
                                <button id = "cancel" value = "Cancel"> Cancel </button>
                        </div>
                        <br />
                        <div>
                                <button id = "browse" type="file"> Browse </button>
                        </div>
                    </form>
                    <br />
                    
                </form>
                {/* </div>     */}
            </div>
   
            
        )
        
    }
  
    
}

export default ProjectConfigurationHolder;