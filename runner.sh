#!/usr/bin/bash
declare apiPId=$apiPId;
declare clientPId=$clientPId;
declare cangenId=$cangenId;

function runClient(){
    cd CAN-Bus-Visualizer/client && npm install axios bootstrap framer-motion gojs-react react react-bootstrap react-color react-dom react-draggable react-native-web react-router-dom react-scripts react-split react-table styled-components web-vitals && npm start &
    clientPId=$!;
    sleep 2 &
}
function run(){
    #start the database
    sudo service mongod start;
   
    #cd into server folder
    cd CAN-Bus-Visualizer/api && npm install axios cors express fs-extra mongoose rsync socketcan nodemon && npm start &
    apiId=$!;
    sleep 2 &
    
    #cd into client folder
    runClient
    
    #start up vcan
    sudo modprobe vcan
    sudo ip link add dev vcan0 type vcan
    sudo ip link set up vcan0
    cangen vcan0 -e -L 8 -g 1000 -v & 
    cangenId=$!;
    sleep 2 &
    
    
    wait;
    echo "processes complete"
   
   
 
}


#to exit and kill processes
function onexit() {
  kill -9 $apiPId;
  kill -9 $clientPId;
  kill -9 $cangenId;
  kill &&
  exit
}
trap onexit SIGINT;
run