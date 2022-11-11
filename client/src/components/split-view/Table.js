import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useMemo } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table';
import {COLUMNS} from './Columns';
import "./Table.css"
import { GlobalFilter } from './GlobalFilter';
const url = 'http://localhost:3001/packets';
const eventSource = new EventSource(url);

export default function CANTable() {    

  const [message, setMessage] = useState([]);
  const [info, setInfo] = useState([]);

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

  function handlePlayTraffic () {
    eventSource.onmessage = (e) => {
    //console.log(e.data);
    const parsedData = JSON.parse(e.data);
    //console.log(parsedData);
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
                    <NavDropdown title="File" id="file-dropdown">
                      <NavDropdown.Item>
                        Save Project
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Open Saved Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="View" id="view-dropdown">
                      <NavDropdown.Item href="#action/3.1">
                        Filter Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Node</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Sort Packets
                        <ul>
                          <NavDropdown.Item href="#action3">Most Recent</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Oldest</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Highest ID</NavDropdown.Item>
                          <NavDropdown.Item href="#action3">Smallest ID</NavDropdown.Item>
                        </ul>
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Packets" id="packets-dropdown">
                      <NavDropdown.Item href="#Modal" data-toggle="Modal">
                        Edit Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Replay Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Save Packets
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.4">
                        Annotate Packets
                      </NavDropdown.Item>
                    </NavDropdown>
                    <NavDropdown title="Play Traffic">
                    <NavDropdown.Item onClick = {handlePlayTraffic}>
                      Start
                    </NavDropdown.Item>
                    <NavDropdown.Item onClick = {handleStopTraffic}>
                      Stop
                    </NavDropdown.Item>
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