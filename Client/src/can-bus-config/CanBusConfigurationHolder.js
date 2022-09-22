import React, { Component } from 'react';
import './CanBusConfigurationHolder.css'


class CanBusConfigurationHolder extends Component {
    render() {
        const handleClick = () => {
            // implementation details
          };
        return (
            <div className='body'>
                <div className='title'><label>Can Bus Menu</label></div>
                <div className='logo'></div>
                <div className='canBusButtons'>
                    <form>
                        <div><button className='option' onClick={handleClick}>Can Bus #1</button></div>
                        <div><button className='option'onClick={handleClick}>Can Bus #2</button></div>                    
                        <div><button className='option'onClick={handleClick}>Can Bus #3</button></div>
                    </form>
                </div>
                <div className='cancel'>
                    <form>
                        <button id='cancelButton'onClick={handleClick}>Cancel</button>
                    </form>
                </div>       
            </div>
        
            
        )
    }
}

export default CanBusConfigurationHolder;