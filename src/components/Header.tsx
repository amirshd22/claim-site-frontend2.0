import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

import { useLogin } from "../stores";
import { LinkContainer } from "react-router-bootstrap";
// import { logout } from "../service";

const Header: React.FC = () => {
  const isLoggedIn = useLogin((state) => state.isLoggedIn);
  // const logUserOut = () => {
  //   try {
  //     logout();
  //     window.location.reload();
  //   } catch (error) {
  //     console.log(error);
  //   }
  // };
  return (
    <Navbar bg="black" variant="dark" expand="lg" sticky="top">
      <Container>
        <Navbar.Brand>
          <img
            src="./logo.png"
            width="40"
            className="d-inline-block align-top"
            alt="logo"
          />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            <LinkContainer to="/">
              <Nav.Link>
                <i className="bi bi-house"></i> Home
              </Nav.Link>
            </LinkContainer>
            <LinkContainer to="./whitepaper">
              <Nav.Link>
                <i className="bi bi-filetype-pdf"></i> White Paper
              </Nav.Link>
            </LinkContainer>
            {isLoggedIn && (
              <LinkContainer to="./profile">
                <Nav.Link>
                  <i className="bi bi-person"></i> User Balance
                </Nav.Link>
              </LinkContainer>
            )}
          </Nav>
          <Nav>
            <NavDropdown
              menuVariant="dark"
              title={
                <>
                  <i className="bi bi-globe"></i> Socials
                </>
              }
            >
              <LinkContainer to="/contact-us">
                <NavDropdown.Item>
                  <i className="bi bi-telephone"></i> ContactUs
                </NavDropdown.Item>
              </LinkContainer>
              <NavDropdown.Item href="https://twitter.com/vadercash?t=mlzb7ZZslkT70F5d1Idz6g&s=09">
                <i className="bi bi-twitter"></i> Twitter
              </NavDropdown.Item>
              <NavDropdown.Item href="https://t.me/vadercash">
                <i className="bi bi-telegram"></i> Telegram
              </NavDropdown.Item>
            </NavDropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default Header;
