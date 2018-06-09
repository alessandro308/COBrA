import React, { Component } from 'react';
import {Navbar, Nav, NavItem, NavDropdown, MenuItem, Grid, Col, Row} from 'react-bootstrap';
import logo from './logo.svg';
import {ContentCard} from "./components/ContentCard";
import './App.css';
import { Web3Provider } from 'react-web3';

const navBar = (<Navbar>
<Navbar.Header>
  <Navbar.Brand>
    <a href="#home">COBrA</a>
  </Navbar.Brand>
</Navbar.Header>
<Nav>
  <NavItem eventKey={1} href="#">
    Catalog
  </NavItem>
  <NavItem eventKey={2} href="#">
    Accessible Contents
  </NavItem>
</Nav>
<Nav pullRight>
      <NavItem>
        Developed by Alessandro Pagiaro
      </NavItem>
</Nav>
</Navbar>);

class App extends Component {
  render() {
    return (
    <Web3Provider >
        <div className="App">
            {navBar}
            <div className="container">
              <Grid>
                <Row>
                  <Col xs={6} md={4}>
                    <ContentCard title="Titolo1" author="Alessandro"/>
                  </Col>
                  <Col xs={6} md={4}>
                    <ContentCard title="Titolo1" author="Alessandro"/>
                  </Col>
                  <Col xs={6} md={4}>
                    <ContentCard title="Titolo1" author="Alessandro"/>
                  </Col>
                </Row>
              </Grid>
            </div>
        </div>
      </Web3Provider>
    );
  }
}

export default App;
