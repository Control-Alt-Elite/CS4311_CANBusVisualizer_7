import React, { Component } from 'react';
import './CanBusConfigurationHolder.css'


class CanBusConfigurationHolder extends Component {
    render() {
        
        return (
            <div className='body'>
                <div className='title'><label>Can Bus Menu</label></div>
                <div className='logo'></div>
                <div className='canBusButtons'>
                    <div><button className='option'>Can Bus #1</button></div>
                    <div><button className='option'>Can Bus #2</button></div>
                    <div><button className='option'>Can Bus #3</button></div>
                </div>
                <div className='cancel'>
                    <button className='cancelButton'>Cancel</button>
                </div>       
            </div>
        
            
        )
    }
}

export default CanBusConfigurationHolder;