import React, { Component, useCallback} from 'react';
import './SessionConfigurationHolder.css'

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

    handleSubmit = event => {
        console.log(`${this.state.analystInitials} has logged in with connector id: ${this.state.canConnectorID}`);
        event.preventDefault()

    }

    render() {
        const { analystInitials, canConnectorID, projectDate, vehicleID, baudRate, dbc_file_name, blacklistFileName} = this.state
        return (     
            <div className='config'>
                <h4 style={{color: 'white'}}>
                    Session
                </h4>
            <form onSubmit={this.handleSubmit}>
                <div className='configForm'>
                    <div className='group-1'>
                        <label for='Initials'>Analyst Initials</label>
                        <input className='Initials' type="text" value={analystInitials} onChange={this.handleAnalystInitials} />
                    </div>
                    <br></br>
                    <div className='group-2'>
                        <label for='Date'>Project Date</label>
                        <input className='Date' type="text" value={projectDate} onChange={this.handleProjectDate} />
                    </div>
                    <br></br>
                    <div className='group-3'>
                        <label for='CANID'>CAN Connector ID</label>
                        <input className='CANID' type="text" value={canConnectorID} onChange={this.handleCanConnectorId} />
                    </div>
                    <br></br>
                    <div className='group-4'>
                        <label for='VehicleID'>Vehicle ID</label>
                        <input className='VehicleID' type="text" value={vehicleID} onChange={this.handleVehicleId} />
                    </div>
                    <br></br>
                    <div className='group-5'>
                        <label for='BaudRate'>Baud Rate</label>
                        <input className='BaudRate' type="text" value={baudRate} onChange={this.handleBaudRate} />
                    </div>
                    <br></br>
                    <div className='group-6'>
                        <label for='BlackList'>Blacklist </label>
                        <input className='BlackList' type="file" value={blacklistFileName} onChange={this.handleBlackListFileName} />
                    </div>
                    <br></br>
                    <div className='group-7'>
                        <label for='DBCFile'>DBC </label>
                        <input className='DBCFile' type="file" value={dbc_file_name} onChange={this.handleDBCFileName} />
                    </div>
                    <br></br>
                    <button id = "submit" value = "Submit"> Submit </button>
                </div>
            </form>
            </div>
            
        )
    }
}

export default SessionConfigurationHolder;