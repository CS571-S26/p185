import React from 'react';
import {Link} from 'react-router-dom';
import {Badge, Container, Nav, Navbar} from "react-bootstrap";
import AuthStatus from "./AuthStatus.jsx";
import {GiIceCreamScoop} from "react-icons/gi";
import {IoIceCream} from "react-icons/io5";
import {BsCart3} from "react-icons/bs";
import {useCart} from "../contexts/CartContext.jsx";

const NavigationBar = ({user, handleCartShow}) => {
    const {totalCount} = useCart();
    return (<Navbar bg={"light"} expand="lg" className={"shadow-sm mb-4"}>
        <Container fluid>
            <Navbar.Brand as={Link} to={"/"} className={"fw-bold text-danger"}>
                <IoIceCream/><GiIceCreamScoop style={{transform: 'scaleX(-1)', marginRight: 15}}/>iScoop
            </Navbar.Brand>

            <Navbar.Toggle aria-controls="basic-navbar-nav"/>

            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="me-auto">
                    <Nav.Link as={Link} to="/products">Products</Nav.Link>
                    <Nav.Link as={Link} to="/order">Order</Nav.Link>
                    <Nav.Link as={Link} to="/order-history">History</Nav.Link>
                </Nav>
                <Nav className={"align-items-center"}>
                    <Nav.Link onClick={handleCartShow}
                              className={"position-relative me-3"}
                              style={{cursor: 'pointer'}}>
                        <BsCart3 size={22} className={"text-dark"}/>
                        {totalCount > 0 && (<Badge pill bg={"danger"}
                                                   className={"position-absolute top-10 start-100 translate-middle"}
                                                   style={{fontSize: '0.7rem', padding: '0.2rem 0.3rem'}}>
                            {totalCount}
                        </Badge>)}
                    </Nav.Link>
                </Nav>
                <AuthStatus user={user}/>
            </Navbar.Collapse>
        </Container>
    </Navbar>);
};

export default NavigationBar;