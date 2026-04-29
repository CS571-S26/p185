import React from 'react';
import {Container, Button} from 'react-bootstrap';
import {Link} from 'react-router-dom';
import Hero from '../components/Hero';
import HomeFeatures from '../components/HomeFeatures';

const Home = () => {
    return (<Container fluid className="px-0">
        <Hero/>
        <HomeFeatures/>
        <div className="bg-light py-5 mt-5">
            <Container className="text-center py-5">
                <h2 className="fw-bold text-danger">Ready for a Scoop?</h2>
                <p className="mt-4 lead text-muted mb-5">Join thousands of ice cream lovers and start building your
                    custom cart today.</p>
                <Button as={Link} to="/products" variant="danger" size="lg" className="px-5 fw-bold py-3">
                    Start Browsing
                </Button>
            </Container>
        </div>
    </Container>);
};

export default Home;