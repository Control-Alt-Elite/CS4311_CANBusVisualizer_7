import React, { Component} from 'react';
import './SessionConfigurationHolder.css';
import './ProjectConfigurationHolder';
import Transitions from './Transitions';
import axios from 'axios';

const getDateTime = () => {
    let tempDate = new Date();
    let date = (tempDate.getMonth()+1) + '-' + tempDate.getDate() + '-' + tempDate.getFullYear();
    //const currDate = "Current Date= "+ date;
    //this.setState({ reportStartDate: currDate})
    return date;
  }


class SessionConfigurationHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
            projectName: '',
            storedLocation:'',
            analystInitials: '',
            projectDate: getDateTime(),     
            canConnectorID: '',
            vehicleID: '',
            baudRate: 5000,
            event_name: '',
            event_date: '',
            dbc_file_name: '',
            blacklistFileName: ''
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

    handleAnalystInitials = (event) => {
        this.setState({
            analystInitials: event.target.value.toUpperCase()
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

    handleSubmit = (event) => {
        const {analystInitials, canConnectorID, projectDate, vehicleID, baudRate, dbc_file_name, blacklistFileName} = this.state;
        axios.post('http://localhost:3001/project/new', {analystInitials: analystInitials, canConnectorID: canConnectorID,
        projectDate: projectDate, vehicleID: vehicleID, baudRate: baudRate, dbc_file_name: dbc_file_name,
        blacklistFileName: blacklistFileName})
         .then((response) => {
          console.log(response);
          })
        event.preventDefault();

    }

    render() {
       
        const { projectName,storedLocation,analystInitials,canConnectorID, projectDate, vehicleID, baudRate, dbc_file_name, blacklistFileName} = this.state
        return (
            <Transitions>
             
        <div className='config'>   
        <div className ='navigationbar'>
       
             
        <div className='sessionWord'>
       
            
            <button className='seesionLogoButton'></button>
            <label className ='sessionStyle'>Configuration </label>       
            </div>
            
             <br /> 
       
        <br />                
                </div>
                
                <div className='seperator'></div>
                <form onSubmit={this.handleSubmit}>
                    <div className='divH'>
                        <label className='configLabel'>Project Name</label><br></br>
                        <input className='aStyle' type="text" placeholder="Enter Project Name" value={projectName} onChange={this.handleProjectName} />
                    </div>
                  
                    <div className='divH'>
                        <label className='configLabel'>Stored Location</label><br></br>
                        <input className='aStyle'type="text" placeholder="Enter Stored Location" value={storedLocation} onChange={this.handleStoredLocation} />
                    </div>
               
                    <div className='divH'>
                        <label className='configLabel'>Analyst Initials</label><br></br>
                        <input className='aStyle'type="text" placeholder="Enter Initials" value={analystInitials} onChange={this.handleAnalystInitials} />
                    </div>
        

                    <div className='divH'>
                        <label className='configLabel'>Project Date</label><br></br>
                        <input className='aStyle'type="date" placeholder="Enter Initials" value={projectDate} onChange={this.handleProjectDate} />
                    </div>
                    
                    <div className='divH'>
                        <label className='configLabel'>CAN Connector ID</label><br></br>
                        <input className='aStyle'type="text" placeholder="Enter Can connector ID" value={canConnectorID} onChange={this.handleCanConnectorId} />
                    </div>
            
                    <div className='divH'>
                        <label className='configLabel'>Vehicle ID</label><br></br>
                        <input className='aStyle'type="text" placeholder="Enter Vehicle ID" value={vehicleID} onChange={this.handleVehicleId} />
                    </div>
            
                    <div className='divH'>
                        <label className='configLabel'>Baud Rate</label><br></br>
                        <input className='aStyle'type="text" placeholder="Enter Baud Rate" value={baudRate} onChange={this.handleBaudRate} />
                    </div>
                 
                    <div className='divH'>
                        <label className='configLabel'>Blacklist </label><br></br>
                        <input className='aStyle' type="file" value={blacklistFileName} onChange={this.handleBlackListFileName} />
                    </div>
                    
                    <div className='divH'>
                        <label className='configLabel'>DBC </label><br></br>
                        <input className='aStyle' type="file" value={dbc_file_name} onChange={this.handleDBCFileName} />
                    </div>
                     

                        <input id = "submit"  className='buttonStyle' value = "Continue" type='submit' />
                    
                </form>
            </div>
            
            </Transitions> 
 
            
        )
    }
}

export default SessionConfigurationHolder;