import React, {useState, useEffect, useMemo} from 'react';
import {Container, Row, Col, Card, Button, Form, ListGroup, Badge} from 'react-bootstrap';
import ProductCard from "../components/ProductCard.jsx";
import {fetchIceCreams} from "../services/iceCreamApi.js";
import {SyncLoader} from "react-spinners";

const Products = ({handleCartShow}) => {
    const [loading, setLoading] = useState(true);
    const [products, setProducts] = useState([]);
    const [filters, setFilters] = useState({
        brands: [], // ['gelato','Haagen-Dazs', 'Ben & Jerry\'s']
        maxSweetness: 5, nutFree: false, dairyFree: false
    });
    useEffect(() => {
        const loadProducts = async () => {
            setLoading(true);
            const queries = ['gelato', 'Haagen-Dazs', `Ben & Jerry's`];
            const results = await Promise.all(queries.map(q => fetchIceCreams(q)));
            const combined = results.flat();
            const unique = Array.from(new Map(combined.map(item => [item.id, item])).values());
            setProducts(unique);
            setLoading(false);
        };
        loadProducts();
    }, []);

    const filteredProducts = useMemo(() => {
        return products.filter(p => {
            // const matchesGelato = !filters.gelatoOnly || p.flavorProfile.isGelato;
            const matchesBrand = filters.brands.length === 0 || filters.brands.some(b => p.brand.includes(b));
            const matchesSweetness = p.flavorProfile.sweetness <= filters.maxSweetness;
            const matchesNutFree = !filters.nutFree || p.flavorProfile.nutFree;
            const matchesDairyFree = !filters.dairyFree || p.flavorProfile.dairyFree;
            return matchesBrand && matchesSweetness && matchesNutFree && matchesDairyFree;
        });
    }, [products, filters]);

    const handleBrandChange = (brandName) => {
        setFilters(prev => ({
            ...prev,
            brands: prev.brands.includes(brandName) ? prev.brands.filter(b => b !== brandName) : [...prev.brands, brandName]
        }));
    };

    if (loading) return (<div className={"text-center py-5"}>
        <h1 className="visually-hidden">Products page</h1>
        <p className={"mb-5"}><strong>Loading Products...</strong></p>
        <SyncLoader style={{marginTop: 30}}/>
    </div>)

    return (<Container fluid className="px-4 py-4">
        <h1 className="visually-hidden">Products page</h1>
        <Row>
            {/* Filters Section */}
            <Col md={3} lg={2} className="mb-4">
                <Card className="shadow-sm border-0 sticky-top" style={{top: '2rem'}}>
                    <Card.Body>
                        <Card.Title className="fw-bold mb-3">Filters</Card.Title>
                        <Form>
                            {/*By Brand/Type */}
                            <Form.Group className="mb-4">
                                <legend className="small fw-bold col-form-label" style={{fontSize: '1rem'}}>Type
                                </legend>
                                <Form.Check
                                    id={"gelato-check"}
                                    type="checkbox" label="Gelato"
                                    checked={filters.brands.includes("gelato")}
                                    onChange={() => handleBrandChange("gelato")}
                                    // onChange={(e) => setFilters({...filters, gelatoOnly: e.target.checked})}
                                />
                                <Form.Check
                                    id={"haagen-dazs-check"}
                                    type="checkbox" label="Haagen-Dazs"
                                    checked={filters.brands.includes("Haagen")}
                                    onChange={() => handleBrandChange("Haagen")}
                                />
                                <Form.Check
                                    id={"ben-n-jerrys-check"}
                                    type="checkbox" label="Ben & Jerry's"
                                    checked={filters.brands.includes("Ben")}
                                    onChange={() => handleBrandChange("Ben")}
                                />
                            </Form.Group>

                            {/* Sweetness */}
                            <Form.Group className="mb-4">
                                <Form.Label className="small fw-bold" htmlFor={"sweetness-range"} column={"sm"}>Sweetness
                                    Level</Form.Label>
                                <Form.Range
                                    id={"sweetness-range"}
                                    min={1} max={5}
                                    value={filters.maxSweetness}
                                    onChange={(e) => setFilters({...filters, maxSweetness: parseInt(e.target.value)})}
                                />
                            </Form.Group>

                            {/* Others */}
                            <Form.Group className="mb-3">
                                <legend className="small fw-bold col-form-label" style={{fontSize: '1rem'}}>Dietary
                                </legend>
                                <Form.Check
                                    id={"nut-free-switch"}
                                    type="switch"
                                    label="Nut Free"
                                    checked={filters.nutFree}
                                    onChange={(e) => setFilters({...filters, nutFree: e.target.checked})}
                                />
                                <Form.Check
                                    id={"dairy-free-switch"}
                                    type="switch"
                                    label="Dairy Free"
                                    checked={filters.dairyFree}
                                    onChange={(e) => setFilters({...filters, dairyFree: e.target.checked})}
                                />
                            </Form.Group>

                            <Button
                                variant="outline-danger" size="sm" className="w-100"
                                onClick={() => setFilters({gelatoOnly: false, brands: [], maxSweetness: 5})}
                            >
                                Reset Filters
                            </Button>
                        </Form>
                    </Card.Body>
                </Card>
            </Col>

            {/* Center product list area */}
            <Col md={9} lg={10}>
                <div className="d-flex justify-content-between align-items-center mb-4">
                    <h2 className="visually-hidden">Products list</h2>
                    <h3 className="fw-bold">Explore Our Flavors</h3>
                    <span className="text-muted small">Showing {filteredProducts.length} products</span>
                </div>
                <Row xs={1} md={2} lg={3} xl={4} className="g-4">
                    {filteredProducts.map((item) => (<Col key={item.id}>
                        <ProductCard product={item} handleCartShow={handleCartShow}/>
                    </Col>))}
                </Row>
            </Col>
        </Row>
    </Container>);
};

export default Products;