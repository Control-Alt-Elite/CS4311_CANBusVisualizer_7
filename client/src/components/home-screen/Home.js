import React from "react";
import Transitions from "../Transitions";
import "./Home.css";
import devcomlogo from "./images/devcomlogo.png";
import AutoRecover from "../split-view/modals/AutoRecover/AutoRecover";
import { useEffect } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const [dataExists, setDataExists] = useState(false)
  useEffect(() => { 
    const packet = localStorage.getItem("packetInfo")
    if(packet){
      setDataExists(true)
    }else{
      console.log("no info found")
    }
    
  }, [])
  function deleteTemp(){
    localStorage.removeItem("packetInfo")
    window.location.reload(false)
  }
  return (
    <Transitions>
      <section id="Title" className="contentarea">
        <div className="logo">
          <img src={devcomlogo} alt="logo" />
          <br></br>
          <h1>CAN Bus Visualizer</h1>
        </div>
      </section>
      <footer className="footer bg-black-default ">
        <div id="footer-div" className="flex flex-col md:flex-row gap-8 justify-between p-6 max-min-width">
          <div id="footer-accessibility" className="flex-1 flex flex-col items-center md:items-end socials text-white font-bold mb-0 justify-center text-right">
            <a href={"https://github.com/Control-Alt-Elite/CS4311_CANBusVisualizer_7"} target={"_blank"} rel="noopener noreferrer">
              © 2022 Software Engineering: Design and Implementation. Team 7: Ctrl + Alt + Elite
            </a>
          </div>
        </div>
      </footer>
      <AutoRecover trigger={dataExists}>
        <Link to="/SplitView">
          <button className="accept-btn">Continue</button>
        </Link>
          <button href = "/" className="reject-btn" onClick={()=>deleteTemp()}>Discard</button>
        
      </AutoRecover>
    </Transitions>
    
  );
};
export default Home;
