import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";
import { useLogin } from "../stores";
import { LinkContainer } from "react-router-bootstrap";
import { logout } from "../service";
const Header: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  const logUserOut = () => {
    try {
      logout();
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Navbar bg="success" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand href="#home">Vader Cash</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="bi bi-house"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="/whitepaper">
              <Nav.Link>
                <i className="bi bi-filetype-pdf"></i> White Paper
              </Nav.Link>
            </LinkContainer>
            <NavDropdown
              title={
                <>
                  <i className="bi bi-person"></i> User
                </>
              }
              id="basic-nav-dropdown"
            >
              {isLoggedIn ? (
                <>
                  <LinkContainer to="/profile">
                    <NavDropdown.Item active={false}>
                      <i className="bi bi-person"></i> Profile
                    </NavDropdown.Item>
                  </LinkContainer>

                  <NavDropdown.Item onClick={logUserOut} active={false}>
                    <i className="bi bi-box-arrow-left"></i> Logout
                  </NavDropdown.Item>
                </>
              ) : (
                <>
                  <LinkContainer to="/login">
                    <NavDropdown.Item active={false}>
                      <i className="bi bi-box-arrow-in-right"></i> Login
                    </NavDropdown.Item>
                  </LinkContainer>
                </>
              )}
            </NavDropdown>
          </Nav>
          <Nav>
            <LinkContainer to="/contact-us">
              <Nav.Link>
                <i className="bi bi-telephone"></i> Contact Us
              </Nav.Link>
            </LinkContainer>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
