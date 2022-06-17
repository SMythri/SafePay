import React from "react";
import logo from "../../assets/gec.jpeg";
import { useLocation } from "react-router-dom";
import { Container, Dropdown, Navbar, Nav, NavDropdown } from "react-bootstrap";

function NavBar(props) {
  let history = useLocation();
  let { pathname } = history;
  return (
    <div>
      <Navbar bg="dark" variant="dark">
        <Container fluid="md">
          <Navbar.Brand href="/donorHomePage">
            <img
              alt=""
              src={logo}
              width="60"
              height="61"
              className="d-inline-block align-top"
            />{" "}
          </Navbar.Brand>
          <Nav className="me-auto" variant="outline" activeKey="/donorHomePage">
            {pathname !== "/donorHomePage" && (
              <Nav.Link href="/donorHomePage">Home</Nav.Link>
            )}
          </Nav>
          <Dropdown>
            <Dropdown.Toggle variant="primary" id="dropdown">
              Profile
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <NavDropdown.Item
                href="#"
                onClick={() => props.setModalShow(true)}
              >
                User Profile
              </NavDropdown.Item>
              <Dropdown.Item href="/">Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Container>
      </Navbar>
    </div>
  );
}
export default NavBar;
