import axios from 'axios';
import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import Transitions from '../../Transitions';
import './OpenProject.css';

export default function OpenProject (props) {

  const [isShown, setIsShown] = useState(false);
  const get_ProjectName = useRef(null); 
  const [getResult, setGetResult] = useState(null);

  //Format project information
  function formatResponse(res) {
    return JSON.stringify(res, null, 2);
  }

  //Show only projects names
  function replacer(key, value) {
    // Filtering out properties
    if (key === 'storedLocation' || key === 'sessions' || key === '_id' || key === '__v') {
      return undefined;
    }
      return value;
  };

  //Format project names information
  function formatResponseAll(res) {
    return JSON.stringify(res, replacer, " ");
  }

  //Get all projects names from database
  async function getAllProjects() {
    try {
      const res = await axios.get('http://localhost:3001/projects');
      const result = {
        Projects: res.data,
      };
      setGetResult(formatResponseAll(result));
    }catch (err) {
      setGetResult(formatResponseAll(err.response?.data || err));
    }
  };

  //Get specific project from database
  async function getDataByProjectName() {
    const projectName = get_ProjectName.current.value;
    if (projectName) {
      try {
        const res = await axios.get('http://localhost:3001/project/new', {
          params: {
            projectName: projectName,
          },
        });
    
        const result = {
          Projects: res.data,
        };
    
        setGetResult(formatResponse(result));
        setIsShown(true);
      }catch (err) {
        setGetResult(formatResponse(err.response?.data || err));
      }
    }
  };
    
  //Clear info box output
  function clearGetOutput() {
    setGetResult(null);
    get_ProjectName.current.value="";
    setIsShown(false);
  };
    
  return (
    <Transitions>
      <div className='config'>
      <div id="app" className="container">
        <div className='header'> 
          <h3 className='text'>Open Existing Project</h3>
        </div>
        <div className="card">
            <div className ="card-header">
              <button id="all" onClick={getAllProjects}>List All Projects</button>
            </div>
            <div className="card-body">
              <div className="input-group">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="">Select Project</span>
                </div>
                <input id="select" type="text" ref={get_ProjectName}  required/>
                <button id="fetch" onClick={getDataByProjectName}>Fetch</button>                     
                <button id="clear" onClick={clearGetOutput}>Clear</button>
              </div>
              { getResult && <div className="alert alert-secondary mt-2" role="alert">{getResult}</div> }
              <br></br>
              {isShown &&(
              <div className='Buttons'>
                <Link to="/SplitView">
                <button className= "continue"> Confirm </button>
                </Link>
                
                  <Link to="/">
                    <button className="continue"> Cancel </button>  
                  </Link>
              </div>)}
            </div>
        </div>
      </div>
      </div>
    </Transitions>
  )
}

