import React, { useMemo, useState } from 'react';
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import Table from 'react-bootstrap/Table';
import { useGlobalFilter, useSortBy, useTable } from 'react-table';
import Editor from "../modals/Editor";
import { COLUMNS } from './Columns';
import { GlobalFilter } from './GlobalFilter';
import "./Table.css";
const url1 = 'http://localhost:3001/packets';
const url2 = 'http://localhost:3001/logs';
const eventSource = new EventSource(url1);  //BUG: This event start when page is loaded, then two candump child processes are created and running at the same time

export default function CANTable() {    // The next function causes 4 renders, needs performance improvement
  
  const [message, setMessage] = useState([]);
  const [info, setInfo] = useState([]);
  //const [listening, setListening] = useState(true);

  const handleMessage = (ecu, values) => {
    setMessage([]);
    var signal='';
    var valueUnit = null;
    var value='';
    var unit='';
    var signalValue = null;
    var datos = values.replace('{','').replace('}','').split(", ");
    for(var i in datos){
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
    console.log("Saving packets...");
    var packet = ''
    info.map((x,y)=>{
      packet+=x.time+" "+x.can+" "+x.id+"#"+x.dt1+x.dt2+x.dt3+x.dt4+x.dt5+x.dt6+x.dt7+x.dt8+"\n"
    })
    const blob = new Blob([packet], {type:"text/plain"});
    try {
    const options = {
      types: [
        {
          accept: {
            //None
          },
        },
      ],
    };
    const handle = await window.showSaveFilePicker(options);
    const writable = await handle.createWritable();
    await writable.write(blob);
    await writable.close();
    return handle;
    } catch (err) {
      console.error(err.name, err.message)
    }
  }

  function handlePlayTraffic () {
    //Reset table values
    setInfo([]);
    setMessage([]);
    eventSource.onmessage = (e) => {
      const parsedData = JSON.parse(e.data);
      setInfo((data) => [...data,parsedData]);
    }
    return () => {
      eventSource.close(); 
    };
  };
  
  function handleStopTraffic () {
    eventSource.close(); 
    console.log("Connection closed");
    return () => {
      eventSource.close(); 
    };
  };

  function handleReplayPackets(){
    //Reset table values
    setInfo([]);
    setMessage([]);
    const eventSource2 = new EventSource(url2);
    eventSource2.addEventListener('message', function(e) {
      const parsedData = JSON.parse(e.data);
      setInfo((data) => [...data,parsedData]);
    });
    eventSource2.addEventListener('close', function(e) {
      eventSource2.close();
      console.log("canplayer connection closed");
    });
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
                    <NavDropdown title="File" id="file-dropdown" menuVariant = "dark">
                      <NavDropdown.Item>
                        Save Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Open Saved Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="View" id="view-dropdown" menuVariant = "dark">
                      <NavDropdown.Item href="#action/3.1">
                        Filter Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Node</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2" menuVariant = "dark">
                        Sort Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Most Recent</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Oldest</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Highest ID</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Smallest ID</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Packets" id="packets-dropdown" menuVariant = "dark">
                      <NavDropdown.Item href="#Modal" data-toggle="Modal">
                        Edit Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleReplayPackets}>
                        Replay Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick={handleSavePackets}>
                        Save Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.4">
                        Annotate Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Play Traffic" menuVariant = "dark">
                      <NavDropdown.Item onClick = {handlePlayTraffic}>
                        Start
                      </NavDropdown.Item>
                      <NavDropdown.Item onClick = {handleStopTraffic}>
                        Stop
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Analyst Tools (Beta)" menuVariant = "dark">
                      <Editor/>                  
                    </NavDropdown>
                    <GlobalFilter globalFilter={state.globalFilter} setGlobalFilter={setGlobalFilter}/> 
                  </Nav>
                </div>
              </Navbar.Collapse>
          </Navbar>
        </div>
          {/* TABLE*/}
          <Table className="rawTable" striped bordered hover responsive variant = "dark" {...getTableProps()}>
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
                  <tr key={i} className="rawrow" onClick = {() => handleMessage(row.original.ecu, row.original.values)} {...row.getRowProps()}>
                      <td width='40'>{i+1}</td>
                      {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                  </tr>
                  )
              })}
              </tbody>
          </Table>
          <Table className="decodedTable" striped bordered hover responsive variant = "dark">
            <thead>
              <tr>
                <th>Signal</th>
                <th>Values</th>
                <th>Unit</th>
              </tr>
            </thead>
            <tbody>
            {message.map(({Signal, Value, Unit}, idx) => (
              <tr key={idx} className= 'signals'>
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