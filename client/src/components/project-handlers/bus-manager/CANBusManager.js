import React from 'react';
import { Link } from 'react-router-dom';
import Transitions from '../../Transitions';
import './CANBusManager.css';

export default function CANBusManager() {
    return (
        <>
        <Transitions>
            <div id="app" className="container">
                <div className='header'> 
                    <h3 className='text'>CAN Bus Manager</h3>
                </div>
                <div className="card">
                    <div className ="card-header">
                        <button id="all">CAN Bus Menu</button>
                    </div>
                    <div className="card-body">
                        <div className="input-group">
                            <div className="input-group-prepend">
                                <span className="input-group-text" id=""></span>
                            </div>
                            <div className='canbusbuttons'>
                                <button id="button">CAN Bus #1</button>
                                <br></br><br></br>
                                <button id="button">CAN Bus #2</button>
                                <br></br><br></br>
                                <button id="button">CAN Bus #3</button>
                                <br></br><br></br>
                            </div>
                        </div>
                        <br></br>
                        <div className='cancel'>
                            <Link to="/">
                                <button id = "cancel"> Cancel </button>  
                            </Link>
                        </div>
                        </div>
                </div>
            </div>
        </Transitions>
        </>
    )
}