import React from "react";
import Nav from "react-bootstrap/Nav";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Container from "react-bootstrap/Container";
import NavDropdown from "react-bootstrap/NavDropdown";
import { Link } from "react-router-dom";

const SideMenu = () => {
  return (
    <Container fluid="md-3 bg-dark text-light">
      <Row>
        <Col>
          <Nav defaultActiveKey="/home" className="flex-column">
            <Nav.Link href="/admin/dashboard">Dashboard</Nav.Link>
            <span>UTILISATEURS</span>
            <Nav.Link href="/admin/users/index">Liste des utilisateurs</Nav.Link>
            <Nav.Link href="/admin/users/add">ajouter un utilisateur</Nav.Link>
            <span>LIVRES</span>
            <Nav.Link href="/admin/books/index">Liste des Livres</Nav.Link>
            <Nav.Link href="/admin/books/create">Ajout de Livre</Nav.Link>

            <span>ANNONCES</span>
            <Nav.Link href="/admin/adverts/index">Liste des annonces</Nav.Link>
            <Nav.Link href="/admin/adverts/create">Ajout d'annonce</Nav.Link>


          </Nav>
        </Col>
      </Row>
    </Container>
  );
};

export default SideMenu;
