import React from 'react'
import Transitions from './Transitions'
import './Home.css'
import devcomlogo from './images/devcomlogo.png'
  
const Home = () => {
    return (
        <>
            <Transitions>
                <section id='Title' className='contentarea'>
                    <div className='logo'> <img src={devcomlogo} alt="logo"/> 
                        <br/>
                        <h1 
                            style={{ color: 'blue' }}>
                            CAN Bus Visualizer
                        </h1>
                    </div>
                </section>
                <footer className='footer bg-black-default '>
                    <div id="footer-div" class="flex flex-col md:flex-row gap-8 justify-between p-6 max-min-width">
                        <div id="footer-accessibility" class="flex-1 flex flex-col items-center md:items-end socials text-white font-bold mb-0 justify-center text-right">
                        <p class="text-base mb-0">© 2022 Software Engineering: Design and Implementation. Team 7<br/></p>
                        </div>
                    </div>
                </footer>
            </Transitions>
        </>
    )
}
  
export default Home