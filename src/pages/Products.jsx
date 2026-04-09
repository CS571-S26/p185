import React, {useState, useEffect} from 'react';
import {Container, Row, Col, Card, Button, Form, ListGroup, Badge} from 'react-bootstrap';
import ProductCard from "../components/ProductCard.jsx";
import {fetchIceCreams} from "../services/iceCreamApi.js";
import { SyncLoader } from "react-spinners";

const Products = () => {
    // connect SerpAPI later
    const [products, setProducts] = useState([]);
    // Filter list
    const [filters, setFilters] = useState({
        sweetness: 0, isGelato: false, hasNuts: false
    });

    const [loading, setLoading] = useState(true);
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const data = await fetchIceCreams();
            setProducts(data);
            setLoading(false);
        };
        loadProducts();
    }, []);

    if (loading) return (
        <div className={"text-center py-5"}>
            <p className={"mb-5"}><strong>Loading Products...</strong></p>
            <SyncLoader style={{marginTop:30}}/>
        </div>
    )

    return (<Container fluid className="px-4 py-4">
        <Row>
            {/* Filters Section */}
            <Col md={3} lg={2} className="mb-4">
                <Card className="shadow-sm border-0 sticky-top" style={{top: '2rem'}}>
                    <Card.Body>
                        <Card.Title className="fw-bold mb-3">Filters</Card.Title>
                        <Form>
                            {/*By Brand/Type */}
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold">Type</Form.Label>
                                <Form.Check type="checkbox" label="Gelato Only"/>
                                <Form.Check type="checkbox" label="Haagen-Dazs"/>
                                <Form.Check type="checkbox" label="Ben & Jerry's"/>
                            </Form.Group>

                            {/* Sweetness */}
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold">Sweetness Level</Form.Label>
                                <Form.Range/>
                            </Form.Group>

                            {/* Others */}
                            <Form.Group className="mb-3">
                                <Form.Label className="small fw-bold">Dietary</Form.Label>
                                <Form.Check type="switch" label="Nut Free"/>
                                <Form.Check type="switch" label="Dairy Free"/>
                            </Form.Group>

                            <Button variant="outline-danger" size="sm" className="w-100 mt-2">
                                Reset Filters
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            {/* Center product list area */}
            <Col md={9} lg={10}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h3 className="fw-bold">Explore Our Flavors</h3>
                    <span className="text-muted small">Showing {products.length} products</span>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {products.map((item) => (<Col key={item}>
                        <ProductCard product={item}/>
                    </Col>))}
                </Row>
            </Col>
        </Row>
    </Container>);
};

export default Products;