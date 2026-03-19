import React from 'react';
import {Button, Nav} from 'react-bootstrap';
import {Link, useNavigate} from 'react-router-dom';
import {signOut} from 'firebase/auth';
import {auth} from '../firebase';

const AuthStatus = ({user}) => {
    const navigate = useNavigate();

    const handleLogout = async () => {
        try {
            await signOut(auth);
            alert("logged out");
            navigate('/');
        } catch (error) {
            console.error("Logout Error:", error);
        }
    };

    return (user ? <>
            <Nav className="align-items-center">
                <Nav.Item className="me-3 text-muted">
                    <small>{user.email}</small>
                </Nav.Item>
                <Button
                    variant="outline-danger"
                    size="sm"
                    onClick={handleLogout}
                    className="fw-bold"
                >
                    Logout
                </Button>
            </Nav>
        </> : <>
            <Nav>
                <Nav.Link as={Link} to="/login" className="p-0">
                    <Button variant="danger" size="sm" className="fw-bold">
                        Login
                    </Button>
                </Nav.Link>
            </Nav>
        </>)
};

export default AuthStatus;