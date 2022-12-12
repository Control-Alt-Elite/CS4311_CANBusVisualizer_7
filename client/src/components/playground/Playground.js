import { RadialGauge } from 'react-canvas-gauges'
import CANTable from "./Table"
import React, { useState, useEffect } from 'react'
import "./Playground.css"
import io from 'socket.io-client';
const ENDPOINT = 'http://localhost:8080/';
const socket = io(ENDPOINT, {
  withCredentials: true,
  extraHeaders: {
    "my-custom-header": "abcd"
  }
});

export default function Playground() {

    const[revs, setRevs] = useState(0);
    const[dist,setDist] = useState(0);
    const[speed, setSpeed] = useState(0);
;
    useEffect(() => {
        
        socket.on("message", (data) => {
            setRevs(data.revs/1000)
            setDist(data.dist);
            setSpeed(data.speed);
        })

        //Remove return statement to prevent delete the script from canvas
        return () => {
            socket.off('message');
        }
    },[]); 


    return (
        <>
        <div className="Playground">
            {/** DASHBOARD REGION **/}
            <div id="dashboard" style={{border: '1px solid white'}}>
                <RadialGauge
                        units='mph'
                        width={470}
                        height={470}
                        marginRight={20}
                        value={speed}
                        minValue={0}
                        maxValue={220}
                        majorTicks={['0', '20', '40', '60', '80', '100', '120', '140', '160', '180', '200', '220']}
                        minorTicks={2}
                        borders={false}
                        strokeTicks={false}
                        highlights={[
                            { from: 0, to: 180, color: "rgba(0,0,255,.25)" },
                            { from: 180, to: 220, color: "rgba(200,50,50,.25)" }
                        ]}
                        colorPlate={'#222'}
                        colorMajorTicks={'#f5f5f5'}
                        colorMinorTicks={'#ddd'}
                        colorTitle={'#fff'}
                        colorUnits={'#ccc'}
                        colorNumbers={'#eee'}
                        colorNeedleStart={'rgba(240, 128, 128, 1)'}
                        colorNeedleEnd={'rgba(255, 160, 122, .9)'}
                        valueBox={true}
                        valueText={dist}
                        borderShadowWidth={0}
                        needleType={'arrow'}
                        needleWidth={3}
                        needleCircleSize={7}
                        needleCircleOuter={true}
                        needleCircleInner={false}
                        animationDuration={500}
                        animationRule={'bounce'}
                        fontNumbersSize={30}
                        fontValue={'Led'}
                        animationValue={true}
                ></RadialGauge>
                <RadialGauge
                        units='rpm'
                        title='x1000 RPM'
                        width={470}
                        height={470}
                        value={revs}
                        valueBox={true}
                        valueDec={3}
                        minValue={0}
                        maxValue={8}
                        majorTicks={['0', '1', '2', '3', '4', '5', '6', '7', '8']}
                        minorTicks={5}
                        borders={false}
                        strokeTicks={true}
                        highlights={[{ from: "6", to: "8", color: "rgba(200, 50, 50, .75)" }]}
                        colorPlate={'#222'}
                        colorNumbers={'#eee'}
                        colorMajorTicks={'#f5f5f5'}
                        colorMinorTicks={'#ddd'}
                        colorTitle={'#fff'}
                        colorUnits={'#ccc'}
                        borderShadowWidth={0}
                        needleType={'arrow'}
                        needleWidth={3}
                        needleCircleSize={7}
                        needleCircleOuter={true}
                        needleCircleInner={false}
                        animationDuration={1500}
                        animationRule={'linear'}
                        fontNumbersSize={30}
                ></RadialGauge>                
            </div>
            {/** DATA REGION **/}
            <div className="data">
                {/* TABLE */}
                <div className="rawTable">
                    <CANTable />
                </div>
            </div>
        </div>
        </>
    );
}

