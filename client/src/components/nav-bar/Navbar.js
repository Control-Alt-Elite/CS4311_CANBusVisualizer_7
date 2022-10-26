import React from 'react'
import { Link } from 'react-router-dom'
import logo from './images/t7logo.png'
import './Navbar.css'
  
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg 
                navbar-dark bg-dark">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/" >
                    <img src={logo} alt="" width={30} height={30} className="d-inline-block align-top "/>
                        CAN Bus Visualizer
                    </a>
                    <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav d-flex bd-highlight">
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/ProjectConfigurationHolder">
                                    Create Project
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/OpenProject">
                                    Open Project
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/Sync">
                                    Sync
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/ArchiveProject">
                                    Archive Project
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/SplitView">
                                    CAN Map Visualizer
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/CANBusManager">
                                    CAN Bus Manager
                                </Link>
                            </li>
                            <li className="nav-item p-2 bd-highlight">
                                <Link className="nav-link" to="/TrafficDisplayer">
                                    Traffic Displayer
                                </Link>
                            </li>
                            <li className="nav-item ms-auto p-2 bd-highlight">
                                <Link className="nav-link" to="/AboutUs">
                                    About Us
                                </Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        </>
    )
}
  
export default Navbar