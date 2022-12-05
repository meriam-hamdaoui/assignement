import { isAuth } from "components/helpers/authantication";
import React from "react";
import { Container, Nav, Navbar } from "react-bootstrap";
import AdminNavbar from "./AdminNavbar";

const HomeNavbar = () => {
  const { token } = isAuth("token");
  return (
    <Navbar bg="light" style={{ backgroundColor: "#2d295a" }}>
      <Container>
        <Navbar.Brand href="/">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {token ? (
            <AdminNavbar />
          ) : (
            <Nav className="me-auto">
              <Nav.Link href="/login">login</Nav.Link>
            </Nav>
          )}
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default HomeNavbar;
