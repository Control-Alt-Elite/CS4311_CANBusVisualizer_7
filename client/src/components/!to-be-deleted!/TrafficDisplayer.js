import React, { useState } from 'react';
import './TrafficDisplayer.css'
import Transitions from './Transitions';
import Table from 'react-bootstrap/Table';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import ToggleButton from 'react-bootstrap/ToggleButton';



export default function OpenProject (props) {

  const url = 'http://localhost:3001/packets';
  const [data, setData] = useState([]);


  function TrafficButton() {
    const [buttonText, setButtonText] = useState("Start Traffic");
    const [checked, setChecked] = useState(false);

    function handleClick () {
        checked ?  setButtonText("Start Traffic") : setButtonText("Stop Traffic");
        const eventSource = new EventSource(url);
        eventSource.onmessage = (e) => {
          console.log(e.data);
          const parsedData = JSON.parse(e.data);
          setData((data) => [...data,parsedData])
        }
      return () => {
        eventSource.close(); 
      };
    }

    return (
      <ToggleButton
        className="mb-2 justify-content-end"
        id="toggle-check"
        type="checkbox"
        variant="primary"
        checked={checked}
        value="1"
        onChange={(e) => setChecked(e.currentTarget.checked)}
        onClick={handleClick}
        >{buttonText}
      </ToggleButton>
    );
  }

  return (
    <Transitions>
      <div id="app" className="container">
        <div className='header'> 
          <h3 className='text'>Traffic Displayer</h3>
        </div>
        <div className="card">
            <div className ="card-header">
              <TrafficButton />
            </div>
            <div className="card-body">
              <div className="input-group">
                <Navbar bg='light' expand="sm" >
                  <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                      <Nav>
                        <NavDropdown title="File" id="navbarScrollingDropdown">
                          <NavDropdown.Item href="#action3">Save Project</NavDropdown.Item>
                          <NavDropdown.Item href="#action4">Open Saved Packets</NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="View" id="navbarScrollingDropdown">
                          <NavDropdown.Item href="#action3">Filter Packets
                            <ul>
                              <NavDropdown.Item href="#action3">Node</NavDropdown.Item>
                            </ul>
                          </NavDropdown.Item>
                          <NavDropdown.Item href="#action4">Sort Packets
                            <ul>
                              <NavDropdown.Item href="#action3">Most Recent</NavDropdown.Item>
                              <NavDropdown.Item href="#action3">Oldest</NavDropdown.Item>
                              <NavDropdown.Item href="#action3">Highest ID</NavDropdown.Item>
                              <NavDropdown.Item href="#action3">Smallest ID</NavDropdown.Item>
                            </ul>
                          </NavDropdown.Item>
                        </NavDropdown>
                        <NavDropdown title="Packets" id="navbarScrollingDropdown">
                          <NavDropdown.Item href="#action3">Edit Packets</NavDropdown.Item>
                          <NavDropdown.Item href="#action4">Replay Packets</NavDropdown.Item>
                          <NavDropdown.Item href="#action4">Save Packets</NavDropdown.Item>
                          <NavDropdown.Item href="#action4">Annotate Packets</NavDropdown.Item>
                        </NavDropdown>
                      </Nav>
                    </Navbar.Collapse>
                  </Container>
                </Navbar>

              </div>
              <div className="alert alert-primary" role="alert">
                <Table responsive overflow-auto="true" table-borderless="true" size="sm" striped bordered hover variant="dark">
                  <thead>
                    <tr>
                      <th width='170'>Time</th>
                      <th width='90'>Interface</th>
                      <th width='100'>ID</th>
                      <th width='40'>00</th>
                      <th width='40'>01</th>
                      <th width='40'>02</th>
                      <th width='40'>03</th>
                      <th width='40'>04</th>
                      <th width='40'>05</th>
                      <th width='40'>06</th>
                      <th width='40'>07</th>
                      <th>Message</th>
                    </tr>
                  </thead>
                  <tbody>
                    {data.map(({time,can,id,dt1,dt2,dt3,dt4,dt5,dt6,dt7,dt8,decoded}, index) => (
                    <tr key={index}>
                      <td width='170'>{time}</td>
                      <td width='90'>{can}</td>
                      <td width='100'>{id}</td>
                      <td width='40'>{dt1}</td>
                      <td width='40'>{dt2}</td>
                      <td width='40'>{dt3}</td>
                      <td width='40'>{dt4}</td>
                      <td width='40'>{dt5}</td>
                      <td width='40'>{dt6}</td>
                      <td width='40'>{dt7}</td>
                      <td width='40'>{dt8}</td>
                      <td>{decoded}</td>
                    </tr>
                    ))}
                  </tbody>
                </Table>
              </div>
              <br></br>
            </div>
        </div>
      </div>
    </Transitions>
  )
}

