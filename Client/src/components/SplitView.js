//import './SplitView.css';

// import ReactLogo from './logo.svg';


function SplitView() {
  const handleClick = () => {
    // implementation details
  };
  
  return (
    <div className="Visualizer">
      <div className = 'top-left-menu'>
        <button onClick={handleClick}>
          Traffic
        </button>
        <button className='canmap'onClick={handleClick}>
          CAN MAP
        </button>
      </div> 
      <div className='title-split'>
        <label>CAN Map Visualizer</label>
      </div>
      <div className='packet-top'>
        <button className = 'grayButton'onClick={handleClick}>
          File
        </button>
        <button className = 'grayButton'onClick={handleClick}>
          View
        </button>
        <button className = 'grayButton'onClick={handleClick}>
          Packets
        </button>
        <button className='traffic grayButton' onClick={handleClick}>
          Play Traffic
        </button>
      </div>
      <div className='node-top'>
        <button className = 'grayButton'onClick={handleClick}>
          File
        </button>
        <button className = 'grayButton'onClick={handleClick}>
          Edit
        </button>
        <button className = 'grayButton'onClick={handleClick}>
          Nodes
        </button>
        <button className='mapbutton grayButton'onClick={handleClick}>
          Map
        </button>
      </div>
      <div className='packet-info'>
        <button className = 'idButton'onClick={handleClick}>
          ID
        </button>
        <button className = 'timeButton'onClick={handleClick}>
          Time 
        </button>
        <button className='dataButton'onClick={handleClick}>
          Data
        </button>
      </div>
      <div className='packet-display'>
        <div className='packetBackground'></div>
      </div>
      <div className='map'>
        <div className='carBack'></div>
      </div>
      <div className='seperator'></div>
      <div className='seperatorLine'></div>

    </div>
    
  );
}

export default SplitView;