import React from 'react';
import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';

const Hero = () => {
    return (<div className="hero-section text-white text-center bg-danger py-5 mb-5"
                 style={{
                     minHeight: '60vh',
                     display: 'flex',
                     alignItems: 'center',
                     backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.0), rgba(0, 0, 0, 0.2),rgba(0, 0, 0, 0.0)), url("${import.meta.env.BASE_URL}assets/hero-icecream.jpg")`,
                     backgroundSize: 'cover',
                     backgroundPosition: 'center',
                     backgroundAttachment: 'fixed'
                 }}>
        <Container className="py-5" style={{
            backdropFilter: 'blur(3px)', borderRadius: '15px', boxShadow: '0 0 5px rgba(0,0,0,0.1)', margin: '50px'
        }}>
            <h1 className="display-2 fw-bold mb-3 text-danger">Scoop & Pull, Your Way</h1>
            <p className="lead mb-5 fs-3">Premium brands, custom sweetness, and dietary-friendly ice cream<br/>
                delivered to your door.</p>
            <div className="d-grid gap-3 d-sm-flex justify-content-sm-center">
                <Button as={Link} to="/products" variant="light" size="lg"
                        className="px-5 fw-bold text-danger py-3">
                    Shop Now
                </Button>
            </div>
        </Container>
    </div>);
};

export default Hero;