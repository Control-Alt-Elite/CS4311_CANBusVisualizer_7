import React, { Component } from 'react';
import './SessionConfigurationHolder.css'
import axios from 'axios';
import Form from 'react-bootstrap/Form';


class SessionConfigurationHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            storedLocation:'',
            analystInitials: '',
            projectDate: '',     
            canConnectorID: '',
            vehicleID: '',
            baudRate: '',
            event_name: '',
            event_date: '',
            dbc_file_name: '',
            blacklistFileName: ''
        }
    }
    handleProjectName = (event) => {
        this.setState({
            blacklistFileName: event.target.value
        })
    }    
    handleStoredLocation = (event) => {
        this.setState({
            blacklistFileName: event.target.value
        })
    }      
    handleAnalystInitials = (event) => {
        this.setState({
            analystInitials: event.target.value
        })
    }
 
    handleProjectDate = (event) => {
        this.setState({
            projectDate: event.target.value
        })
    }
    handleCanConnectorId = (event) => {
        this.setState({
            canConnectorID: event.target.value
        })
    }
    handleVehicleId = (event) => {
        this.setState({
            vehicleID: event.target.value
        })
    }
    handleBaudRate = (event) => {
        this.setState({
            baudRate: event.target.value
        })
    }
    handleDBCFileName = (event) => {
        this.setState({
            dbc_file_name: event.target.value
        })
    }
    handleBlackListFileName = (event) => {
        this.setState({
            blacklistFileName: event.target.value
        })
    }      

    handleChange = (event) => {
        this.setState({ [event.target.name]: event.target.value });
      }
      
    handleSubmit = event => {
        const {projectName,storedLocation,analystInitials,
            projectDate,
            vehicleID,
            baudRate,
            canConnectorID,
            blacklistFileName,dbc_file_name} = this.state;
        axios.post('http://localhost:3001/project/new', {
            projectName: projectName,
            storedLocation:storedLocation,
            analystInitials: analystInitials,
            projectDate: projectDate,
		    vehicleID: vehicleID,
		    baudRate: baudRate,
		    canConnectorID: canConnectorID,
		    blacklistFileName: blacklistFileName,
		    dbc_file_name: dbc_file_name})
        .then((response) => {
            console.log(response);
        })
        event.preventDefault();
    }

    render() {
        const { projectName,storedLocation,analystInitials,canConnectorID, projectDate, vehicleID, baudRate, dbc_file_name, blacklistFileName} = this.state
        return (
            
        <div className='config'>   
        <div className ='navigationbar'>
       
             
        <div className='sessionWord'>
       
            
            <button className='seesionLogoButton'></button>
            <label className ='sessionStyle'>Configuration </label>       
            </div>
            
             <br /> 
       
        <br />                
                </div>
                <div class='seperator'></div>
                <Form onSubmit={this.handleSubmit}>
                    <div>
                        <label className='configLabel'>Project Name</label><br></br>
                        <Form.Control className='aStyle' type="text" placeholder="Enter Project Name" value={projectName} onChange={this.handleProjectName} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Stored Location</label><br></br>
                        <Form.Control className='aStyle'type="text" placeholder="Enter Stored Location" value={storedLocation} onChange={this.handleStoredLocation} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Analyst Initials</label><br></br>
                        <Form.Control className='aStyle'type="text" placeholder="Enter Initials" value={analystInitials} onChange={this.handleAnalystInitials} />
                    </div>
                    <br />

                    <div>
                        <label className='configLabel'>Project Date</label><br></br>
                        <Form.Control className='aStyle'type="date" placeholder="Enter Initials" value={projectDate} onChange={this.handleProjectDate} />
                    </div>
                    <br />                    
                    <div>
                        <label className='configLabel'>CAN Connector ID</label><br></br>
                        <Form.Control className='aStyle'type="text" placeholder="Enter Can connector ID" value={canConnectorID} onChange={this.handleCanConnectorId} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Vehicle ID</label><br></br>
                        <Form.Control className='aStyle'type="text" placeholder="Enter Vehicle ID" value={vehicleID} onChange={this.handleVehicleId} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Baud Rate</label><br></br>
                        <Form.Control className='aStyle'type="text" placeholder="Enter Baud Rate" value={baudRate} onChange={this.handleBaudRate} />
                    </div>
                    <br /> 
                    <div>
                        <label className='configLabel'>Blacklist </label><br></br>
                        <input className='aStyle' type="file" value={blacklistFileName} onChange={this.handleBlackListFileName} />
                    </div>
                    <br /> 
                    <div>
                        <label className='configLabel'>DBC </label><br></br>
                        <input class='aStyle' type="file" value={dbc_file_name} onChange={this.handleDBCFileName} />
                    </div>
                    <br />  

                        <input id = "submit"  className='buttonStyle' value = "Continiue" type='submit' />
                    
                </Form>
            </div>
            
        )
    }
}

export default SessionConfigurationHolder;