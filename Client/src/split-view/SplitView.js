import './SplitView.css';
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
        <button onClick={handleClick}>
          CAN MAP
        </button>
      </div> 
      <div className='title-split'>
        <label>CAN Map Visualizer</label>
      </div>
      <div className='top-right-menu'>

      </div>
      <div className='packet-top'>
        <button onClick={handleClick}>
          File
        </button>
        <button onClick={handleClick}>
          View
        </button>
        <button onClick={handleClick}>
          Packets
        </button>
        <button onClick={handleClick}>
          Play Traffic
        </button>
      </div>
      <div className='node-top'>
        <button onClick={handleClick}>
          File
        </button>
        <button onClick={handleClick}>
          Edit
        </button>
        <button onClick={handleClick}>
          Nodes
        </button>
        <button onClick={handleClick}>
          Map
        </button>
      </div>
      <div className='packet-info'>
        <button onClick={handleClick}>
          ID
        </button>
        <button onClick={handleClick}>
          Time 
        </button>
        <button onClick={handleClick}>
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