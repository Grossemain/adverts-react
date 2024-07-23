import React from "react";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const Header = () => {
    return (
        <div>
            <Navbar bg="light" expand="lg">
                <Container fluid>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                        <Nav
                            className="me-auto my-2 my-lg-0"
                            style={{ maxHeight: "100px" }}
                            navbarScroll
                        >
                            <Nav.Link href="/home">Accueil</Nav.Link>
                            <NavDropdown title="Annonces" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/adverts">
                                    Liste des annonces
                                </NavDropdown.Item>
                            </NavDropdown>
                            <NavDropdown title="Compte" id="navbarScrollingDropdown">
                                <NavDropdown.Item href="/auth/login">
                                    Connection
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/register">
                                    Créer compte
                                </NavDropdown.Item>
                                <NavDropdown.Item href="/admin/dashboard" className="bg-dark text-light">
                                    Admin
                                </NavDropdown.Item>
                            </NavDropdown>

                        </Nav>
                    </Navbar.Collapse>
                </Container>
            </Navbar>         
        </div>
    );
};

export default Header;