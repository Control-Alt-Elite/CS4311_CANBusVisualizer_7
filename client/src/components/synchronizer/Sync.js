import React, {useState, useEffect} from 'react'
import Transitions from "../Transitions";
import "./Sync.css";
import axios from 'axios'
import { Link } from 'react-router-dom';



export default function Sync() {
  //Declare new state variables
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [senderFilePath, setSenderFilePath] = useState('/home/kali/');
  const [receiverFilePath, setReceiverFilePath] = useState('/home/kali/Sync');
  const [receiverIp, setReceiverIP] = useState('');
  const [ip, setIP] = useState('');


  // Response from Sync API
  const [postResponse, setPostResponse] = useState('');

  //creating function to load ip address from the API
  const getData = async () => {
    const res = await axios.get('https://geolocation-db.com/json/')
    console.log(res.data);
    setIP(res.data.IPv4)
  }

  
  
  const handleSync = async (event) => {
      // prevents the submit button from refreshing the page
      event.preventDefault();
      const data = {username: username, password: password, receiverIp: receiverIp, 
        senderFilePath: senderFilePath, receiverFilePath: receiverFilePath}

      await axios.post('http://localhost:3001/Sync', data)
          .then((response) => {
            setPostResponse(response);
            console.log(response.data);
        }).finally (() => {
          setPostResponse('Unable to sync');
        }
      );
  };
  
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
      <Link to="/">
         <button id = "cancel" value = "Cancel" > Cancel </button>  
            </Link>
              <button className="sync-button" onClick={handleSync/*() => {
                setIsRunning(true);
                handleSync();
              }*/}>Sync</button> 
     
      </div>
      <div className="ip">
      <h2>Your IP Address is</h2>
      <h4>{ip}</h4>
    </div>

          <form>
          <div className="form-grouprow">

            <label className=''>Root Username
            <br/>
            
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="username"
                  name="Username"
                  placeholder="Username"
                  required
                  onChange={event => {setUsername(event.target.value)}}
                  value = {username}
                />
            </label>
            </div>
            <div className="form-grouprow">
            <label className=''>Password
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="password" id="password"
                  name="password"
                  placeholder="Password"
                  required
                  onChange={event => {setPassword(event.target.value)}}
                  value = {password}
                  
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
                  onChange={event => {setReceiverIP(event.target.value)}}
                />
            </label>
            </div>
            <div className="form-grouprow">
            <label className=''> Sender Location Stored
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="locationStored"
                  name="Location Stored"
                  placeholder="Sender Location Stored"
                  required
                  onChange={event => {setSenderFilePath(event.target.value)}}
                />
            </label>
            </div>
            
            <div className="form-grouprow">
            <label className=''> Receiver Location to store
            <br/>
                <span className='title-required'>(Required)</span>
                <input
                  className='textBoxE'
                  type="text" id="locationStored"
                  name="Location Stored"
                  placeholder="Receiver Location To Store"
                  required
                  onChange={event => {setReceiverFilePath(event.target.value)}}
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