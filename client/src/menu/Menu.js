import React, { Component } from 'react';
import { Navbar, Nav, NavItem } from 'react-bootstrap';

class Menu extends Component {

  render() {
    return (
      <div>
        <Navbar inverse fluid fixedTop>
          <Navbar.Header>
            <Navbar.Brand>
              <a href="#home">Home</a>
            </Navbar.Brand>
            <Navbar.Toggle />
           </Navbar.Header>
          <Navbar.Collapse>
            <Nav>
              <NavItem href="#aboutMe">About Me</NavItem>
              <NavItem href="#projects">Personal Projects</NavItem>
            </Nav>
            <Nav pullRight>
              <NavItem href="#contactMe">Contact Me</NavItem>
            </Nav>
          </Navbar.Collapse>
        </Navbar>
      </div>
    );
  }
}

export default Menu;