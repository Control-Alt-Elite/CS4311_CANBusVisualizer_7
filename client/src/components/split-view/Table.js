import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import React, { useState, useMemo } from 'react';
import { useTable, useGlobalFilter, useSortBy } from 'react-table'
import Table from 'react-bootstrap/Table';
import {COLUMNS} from './Columns'
import "./Table.css"
import { GlobalFilter } from './GlobalFilter';
const url = 'http://localhost:3001/packets';
const eventSource = new EventSource(url);

export default function CANTable() {    

    const [message, setMessage] = useState('');
    const [info, setInfo] = useState([]);

    const handleMessage = (ecu, values) => {
        const parsedMessage = {
            ECU: ecu,
            Values: values
          };
        setMessage(JSON.stringify(parsedMessage, null,2));
    };

    function handlePlayTraffic () {
        eventSource.onmessage = (e) => {
          //console.log(e.data);
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

    const data = useMemo(() => [...info], [info]);
    const columns = useMemo(() => COLUMNS, []);

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
        initialState: {
            hiddenColumns: ["values"],
        },
    }, useGlobalFilter, useSortBy);

    // Render the UI for your table
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
          <Table striped bordered hover responsive variant = "dark" {...getTableProps()}>
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
                  <tr key={i} onClick = {() => handleMessage(row.original.ecu, row.original.values)} {...row.getRowProps()}>
                      <td width='40'>{i+1}</td>
                      {row.cells.map(cell => {
                      return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                      })}
                  </tr>
                  )
              })}
              </tbody>
          </Table>
      { message && <div className="alert alert-primary" role="alert"><pre><p>{message}</p></pre></div> }
    </>
    )
  }