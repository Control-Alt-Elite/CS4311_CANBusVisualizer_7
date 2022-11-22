const exec = require('child_process').execSync;
const { fork } = require('child_process');

// This function initialize the virtual can bus interface.
function initializeVirtualCAN (device) {
    // Check if the vcan interface is already running and turn it off
    try{
        exec('sudo ip link del ' + device);
    } catch(error) {
        console.log('No previous ' + device + ' interface is running. Proceed');
    }
    //Start simulation
    exec('sudo modprobe vcan')
    // Turn on CAN bus
    try {
        // Create a vcan network interface with a specific name
        exec('sudo ip link add dev ' + device + ' type vcan');
    } catch(error) {
        console.log("CAN bus already initialized");
    }
    exec('sudo ip link set up ' + device);
    // These are not necessary but shows if the virtual CAN is running or not
    result = exec('ifconfig ' + device);
    console.log(result.toString())

    /*
    //Initializing child Player to replay packets
    let signal = 'START'
    const grandchild = fork(__dirname + '/modules/Cangen');

    grandchild.on('message', (message) => {
        console.log(message);
    });
  
    grandchild.send(signal);
    */    

}
module.exports = {initializeVirtualCAN}