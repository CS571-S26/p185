import React from 'react';
import {Container, Row, Col, Card} from 'react-bootstrap';
import {GiIceCreamScoop, GiWrappedSweet} from "react-icons/gi";
import {BsShieldCheck} from "react-icons/bs";

const HomeFeatures = () => {
    const features = [{
        icon: <GiIceCreamScoop size={50}/>,
        title: "Premium Selections",
        text: "From authentic Gelato to Haagen-Dazs and Ben & Jerry's, we curated only the best for you."
    }, {
        icon: <GiWrappedSweet size={50}/>,
        title: "Custom Sweetness",
        text: "Choose your preferred sweetness level to match your unique palate."
    }, {
        icon: <BsShieldCheck size={50}/>,
        title: "Dietary Friendly",
        text: "Easily filter for Nut-Free and Dairy-Free options without compromising on flavor."
    }];

    return (<Container className="mb-5 py-5">
        <Row xs={1} md={3} className="g-4 text-center">
            {features.map((f, idx) => (<Col key={idx}>
                <Card className="h-100 shadow-sm border-0 p-4 transition-hover">
                    <Card.Body>
                        <div className="text-danger mb-4">{f.icon}</div>
                        <Card.Title className="fw-bold fs-4">{f.title}</Card.Title>
                        <Card.Text className="text-muted">{f.text}</Card.Text>
                    </Card.Body>
                </Card>
            </Col>))}
        </Row>
    </Container>);jj
};

export default HomeFeatures;