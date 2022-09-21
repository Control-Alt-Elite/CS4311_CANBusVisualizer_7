import './SplitView.css';


function SplitView() {
  const handleClick = () => {
    // implementation details
  };
  
  
  return (
    <div className="SplitView">
      <button className='carLogo'></button>
      <div class='seperator'></div>
      <div class= "name">CAN Map Visualizer</div>
      <button id="trafficButton" onClick={handleClick}>
        Traffic
      </button>
      <button id="CANButton" onClick={handleClick}>
        CAN MAP
      </button>
      <button id="min" onClick={handleClick}>
        _
      </button>
      <button id="max" onClick={handleClick}>
        O
      </button>
      <button id="exit" onClick={handleClick}>
        X
      </button>
      <button id="fileLeft" onClick={handleClick}>
        File
      </button>
      <button id="view" onClick={handleClick}>
        View
      </button>
      <button id="packets" onClick={handleClick}>
        Packets
      </button>
      <button id="play" onClick={handleClick}>
        Play Traffic
      </button>
      <button id="fileRight" onClick={handleClick}>
        File
      </button>
      <button id="edit" onClick={handleClick}>
        Edit
      </button>
      <button id="nodes" onClick={handleClick}>
        Nodes
      </button>
      <button id="map" onClick={handleClick}>
        Map
      </button>
      
      <button id="id" onClick={handleClick}>
        ID
      </button>
      <button id="time" onClick={handleClick}>
        Time 
      </button>
      <button id="data" onClick={handleClick}>
        Data
      </button>
    </div>
  );
}

export default SplitView;
