import React, {useState, useEffect} from 'react'
import Transitions from "./Transitions";
import "./Sync.css";
import axios from 'axios'
import { Link } from 'react-router-dom';



export default function Sync() {
  const [ip, setIP] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }
  
  useEffect( () => {
    //passing getData method to the lifecycle method
    getData()

  }, [])

  const [filled, setFilled] = useState(0);
	const [isRunning, setIsRunning] = useState(false);
	useEffect(() => {
		if (filled < 100 && isRunning) {
			setTimeout(() => setFilled(prev => prev += 2), 50)
		}
	},[filled, isRunning])
  return (
  
      <Transitions>
        <div className="config">
          <div className="header">
            <h3 className="text">Sync</h3>
          </div>
          <div>
		    <div className="progressbar">
			  <div style={{
				  height: "100%",
				  width: `${filled}%`,
				  backgroundColor: "#808080",
				  transition:"width 0.5s"
			  }}></div>
			  <span className="progressPercent">{ filled }%</span>
		  </div>
      <Link to="/">
         <button id = "cancel" value = "Cancel" > Cancel </button>  
            </Link>
              <button className="sync-button" onClick={() => {setIsRunning(true)}}>Sync</button> 
     
      </div>
      <div className="ip">
      <h2>Your IP Address is</h2>
      <h4>{ip}</h4>
    </div>

          <form>
          <div className="form-grouprow">

            <label className=''>Username
            <br/>
            
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="username"
                  name="Username"
                  placeholder="Username"
                  required
                  
                />
            </label>
            </div>
            <div className="form-grouprow">
            <label className=''>Password
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="password"
                  name="Password"
                  placeholder="Password"
                  required
                  
                />
                
            </label>
           
            </div>
            <div className="form-grouprow">
            <label className=''> IP Address
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="ipaddress"
                  name="ip-address"
                  placeholder="IP Address"
                  required
               
                />
            </label>
            </div>
            <div className="form-grouprow">
            <label className=''> Location Stored
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="locationStored"
                  name="Location Stored"
                  placeholder="Location Stored"
                  required
                  
                />
            </label>
            </div>
      
            <div className="ip-input">    
           
            
           
            </div>
        
          </form>
        </div>
      </Transitions>
    
  )
  
}
