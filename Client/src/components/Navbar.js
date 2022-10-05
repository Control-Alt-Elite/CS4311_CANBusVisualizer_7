import React from 'react'
import { Link } from 'react-router-dom'
  
const Navbar = () => {
    return (
        <>
            <nav className="navbar navbar-expand-lg 
                navbar-light bg-light">
                <div className="container-fluid">
                    <a className="navbar-brand" href="/">
                        CAN Bus Visualizer
                    </a>
                    <button className="navbar-toggler" 
                        type="button" data-bs-toggle="collapse" 
                        data-bs-target="#navbarNav" aria-controls="navbarNav" 
                        aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNav">
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <Link className="nav-link active" 
                                    aria-current="page" to="/">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/ProjectConfigurationHolder">
                                    Create Project
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/SessionConfigurationHolder">
                                    Session
                                </Link>
                            </li>
                            <li className="nav-item">
                                <Link className="nav-link" to="/SplitView">
                                    Visualizer
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