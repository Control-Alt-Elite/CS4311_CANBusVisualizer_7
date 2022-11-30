const exec = require('child_process').execSync;

// This function initialize the can bus interface (needs two parameters for the CAN Bus Hardware device and bitrate)
function initializeCAN (device, rate) {
    //Connection to CAN Bus Hardware
    // Check if the can interface is already running and turn it off
    try{
        exec('sudo ip link del ' + device);
    } catch(error) {
        console.log('No previous ' + device + ' interface is running. Proceed');
    }
    // Turn on CAN bus
    try {
        exec('sudo ip link set ' + device + ' up type can bitrate ' + rate);
    } catch(error) {
        console.log('CAN bus can\'t be initialized. Please check your connection');
    }
    // These are not necessary but shows if the CAN Bus is running or not
    result = exec('ifconfig');
    console.log(result.toString())
}
module.exports = {initializeCAN}