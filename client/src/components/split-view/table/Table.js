import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useMemo } from 'react';
import axios from 'axios';
import { useTable, useGlobalFilter, useSortBy } from 'react-table';
import Table from 'react-bootstrap/Table';
import { COLUMNS } from './Columns';
import "./Table.css"
import { GlobalFilter } from './GlobalFilter';
import { Button } from "react-bootstrap";
import { useEffect } from "react";

const url1 = 'http://localhost:3001/packets';
const url2 = 'http://localhost:3001/logs';
const url3 = 'http://localhost:3001/kill';
let eventSource;

export default function CANTable() {    // The next function causes 4 renders, needs performance improvement
  const [message, setMessage] = useState([]);
  const [info, setInfo] = useState([]);
  const [disable, setDisable] = useState(true);
  const [fileName, setFileName] = useState('');
  useEffect(() => { 
    setDisable(true)
    const packet = localStorage.getItem("packetInfo")
    if(packet){
      const savedPackets = JSON.parse(packet)
      setInfo(savedPackets)
    }else{
      console.log("no info found")
    }
    
  }, [])
  function saveTemp() {
    localStorage.removeItem("packetInfo")
    localStorage.setItem("packetInfo",JSON.stringify(info))
  }
  
  const handleMessage = (ecu, values) => {
    setMessage([]);
    var signal = '';
    var valueUnit = null;
    var value = '';
    var unit = '';
    var signalValue = null;
    var datos = values.replace('{', '').replace('}', '').split(", ");
    for (var i in datos) {
      signalValue = datos[i].split(": ");
      signal = signalValue[0];
      valueUnit = signalValue[1].split(" ");
      value = valueUnit[0];
      unit = valueUnit[1];

      const parsedMessage = {
        Signal: signal,
        Value: value,
        Unit: unit,
      };

      setMessage((infodata) => [...infodata, parsedMessage]);
    };
  };

  async function handleSavePackets () {
    var packet = ''
    info.map((x,y)=> (
      packet+=x.time+" "+x.can+" "+x.id+"#"+x.dt1+x.dt2+x.dt3+x.dt4+x.dt5+x.dt6+x.dt7+x.dt8+"\n"))
    const blob = new Blob([packet], {type:"text/plain"});
    try {
    const options = {
      suggestedName:'test.log',
      types: [
        {
          description: 'Log files',
          accept: {
            'text/plain': ['.log'],
          },
        },
      ],
      excludeAcceptAllOption: true,
    };
    const handle = await window.showSaveFilePicker(options);
    setFileName(handle.name);
    setDisable(false);
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    console.log("Packets file saved.");
    return handle;
    } catch (err) {
      console.error(err.name, err.message)
    }
  }

   function handlePlayTraffic() {
    eventSource = new EventSource(url1)
    //Reset table values
    setInfo([]);
    setMessage([]);
    eventSource.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      setInfo((data) => [...data, parsedData]);
    }
  };

  function handleStopTraffic() {
    eventSource.close();
    console.log("Connection closed");
    saveTemp()
  };

  function handleReplayPackets() {
    //Reset table values
    setInfo([]);
    setMessage([]);

    // prevents the submit button from refreshing the page
    //event.preventDefault();

    //Terminate cangen first
    const dato = { params: { message: 'Kill process!' } };
    axios.get(url3, dato).then((response) => {
      console.log(response.data);
    });

    //const data = {params: {fileName: fileName}};  (TODO)
    //axios.post('http://localhost:3001/file', data);
    console.log(fileName)

    const eventSource2 = new EventSource(url2);
    eventSource2.addEventListener('message', function (e) {
      const parsedData = JSON.parse(e.data);
      setInfo((data) => [...data, parsedData]);
    });
    eventSource2.addEventListener('close', function (e) {
      eventSource2.close();
      console.log("canplayer connection closed");
    });
    saveTemp()
    return () => {
      eventSource2.close();
    };
    
  }

  const data = useMemo(() => [...info], [info]);
  const columns = useMemo(() => COLUMNS, []);

  const updateMyData = (rowIndex, columnId, value) => {
    // We also turn on the flag to not reset the page
    setInfo(old =>
      old.map((row, index) => {
        if (index === rowIndex) {
          return {
            ...old[rowIndex],
            [columnId]: value,
          }
        }
        return row
      })
    )
    saveTemp()
  }

  // State and functions returned from useTable to build the UI
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({
    columns,
    data,
    updateMyData,
    initialState: {
      hiddenColumns: ["values"],
    },
  }, useGlobalFilter, useSortBy);

  // Render the UI for the table
  return (
    <>
      {/* TABLE MENU */}
      <div className="packetDropdowns">
        <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
          <Navbar.Collapse>
            <div className="navigationBottomBar">
              <Nav>
                <NavDropdown title="File" id="file-dropdown">
                  <NavDropdown.Item>
                    Save Project
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    Open Saved Packets
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="View" id="view-dropdown">
                  <NavDropdown.Item>
                    Filter Packets
                    <ul>
                      <NavDropdown.Item>Node</NavDropdown.Item>
                    </ul>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    Sort Packets
                    <ul>
                      <NavDropdown.Item>Most Recent</NavDropdown.Item>
                      <NavDropdown.Item>Oldest</NavDropdown.Item>
                      <NavDropdown.Item>Highest ID</NavDropdown.Item>
                      <NavDropdown.Item>Smallest ID</NavDropdown.Item>
                    </ul>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Packets" id="packets-dropdown">
                  <NavDropdown.Item href="#Modal" data-toggle="Modal">
                    Edit Packets
                  </NavDropdown.Item>
                  <NavDropdown.Item disabled={disable} onClick={handleReplayPackets}>
                    Replay Packets
                  </NavDropdown.Item>
                  <NavDropdown.Item onClick={handleSavePackets}>
                    Save Packets
                  </NavDropdown.Item>
                </NavDropdown>
                <Button id='playtraffic' onClick={handlePlayTraffic}>Play</Button>
                <Button id='stoptraffic' onClick={handleStopTraffic}>Stop</Button>
                <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter} />
              </Nav>
            </div>
          </Navbar.Collapse>
        </Navbar>
      </div>
      {/* TABLE*/}
      <Table className="rawTable" striped bordered hover responsive variant="dark" {...getTableProps()}>
        <thead>
          {headerGroups.map(headerGroup => (
            <tr {...headerGroup.getHeaderGroupProps()}>
              <th width='40'>No.</th>
              {headerGroup.headers.map(column => (
                <th {...column.getHeaderProps(column.getSortByToggleProps)}>{column.render('Header')}
                  <span>{column.isSorted ? (column.isSortedDesc ? " 🔽" : " 🔼") : ""}</span>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody {...getTableBodyProps()}>
          {rows.map((row, i) => {
            prepareRow(row)
            return (
              <tr key={i} className="rawrow" onClick={() => handleMessage(row.original.ecu, row.original.values)} {...row.getRowProps()}>
                <td width='40'>{i + 1}</td>
                {row.cells.map(cell => {
                  return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                })}
              </tr>
            )
          })}
        </tbody>
      </Table>
      <Table className="decodedTable" striped bordered hover responsive variant="dark">
        <thead>
          <tr>
            <th>Signal</th>
            <th>Values</th>
            <th>Unit</th>
          </tr>
        </thead>
        <tbody>
          {message.map(({ Signal, Value, Unit }, idx) => (
            <tr key={idx} className='signals'>
              <td>{Signal}</td>
              <td>{Value}</td>
              <td>{Unit}</td>
            </tr>
          ))}
        </tbody>
      </Table>
      
    </>
    
    
  )
}