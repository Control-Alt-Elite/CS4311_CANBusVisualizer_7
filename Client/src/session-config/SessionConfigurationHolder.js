import React, { Component } from 'react';
import './SessionConfigurationHolder.css'


class SessionConfigurationHolder extends Component {

    constructor(props) {
        super(props)

        this.state = {
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

    handleSubmit = event => {
        console.log(`${this.state.analystInitials} has logged in with connector id: ${this.state.canConnectorID}`);
        event.preventDefault()
    }

    render() {
        const { analystInitials,projectName,canConnectorID, projectDate, vehicleID, baudRate, dbc_file_name, blacklistFileName} = this.state
        return (
            
        <div className='config'>   
        <div className ='navigationbar'>
       
                
        <div className='sessionWord'>
       
            
            <button className='seesionLogoButton'></button>
            <label>Session</label>       
            </div>
            
             <br /> 
       
        <br />
                    
                
                </div>
                <div class='seperator'></div>
                <form onSubmit={this.handleSubmit}>
                    <div>
                        <label className='configLabel'>Analyst Initials</label><br></br>
                        <input className='configInput' type="text" value={analystInitials} onChange={this.handleAnalystInitials} />
                    </div>
                    <br />

                    <div>
                        <label className='configLabel'>Project Date</label><br></br>
                        <input className='configInput' type="text" value={projectDate} onChange={this.handleProjectDate} />
                    </div>
                    <br />                    
                    <div>
                        <label className='configLabel'>CAN Connector ID</label><br></br>
                        <input className='configInput' type="text" value={canConnectorID} onChange={this.handleCanConnectorId} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Vehicle ID</label><br></br>
                        <input className='configInput' type="text" value={vehicleID} onChange={this.handleVehicleId} />
                    </div>
                    <br />
                    <div>
                        <label className='configLabel'>Baud Rate</label><br></br>
                        <input className='configInput' type="text" value={baudRate} onChange={this.handleBaudRate} />
                    </div>
                    <br /> 
                    <div>
                        <label className='configLabel'>Blacklist </label><br></br>
                        <input className='configInput' type="file" value={blacklistFileName} onChange={this.handleBlackListFileName} />
                    </div>
                    <br /> 
                    <div>
                        <label className='configLabel'>DBC </label><br></br>
                        <input className='configInput' type="file" value={dbc_file_name} onChange={this.handleDBCFileName} />
                    </div>
                    <br /> 
                    

                     <form>
                        <button id = "submit" value = "Submit"> Submit </button>
                     </form>
                    
                </form>
            </div>
            
        )
    }
}

export default SessionConfigurationHolder;