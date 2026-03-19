import React from 'react';
import {Link} from 'react-router-dom';
import {Container, Nav, Navbar} from "react-bootstrap";
import AuthStatus from "./AuthStatus.jsx";

const NavigationBar = ({user}) => {
    return (
        <Navbar bg={"light"} expand="lg" className={"shadow-sm mb-4"}>
            <Container>
                {/*ToDo: {replace emoji to image later}*/}
                <Navbar.Brand as={Link} to={"/"} className={"fw-bold text-danger"}>🍦 iScoop</Navbar.Brand>

                <Navbar.Toggle aria-controls="basic-navbar-nav" />

                <Navbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/products">Products</Nav.Link>
                        <Nav.Link as={Link} to="/cart">Cart</Nav.Link>
                    </Nav>
                    <AuthStatus user={user}/>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    );
};

export default NavigationBar;