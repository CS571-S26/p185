import React, {useState} from 'react';
import {Container, Row, Col, Form, Button, Card, ListGroup, Image} from 'react-bootstrap';
import {useCart} from '../contexts/CartContext';
import {useNavigate} from 'react-router-dom';
import {IoIceCream} from "react-icons/io5";
import {GiIceCreamScoop} from "react-icons/gi";
import PriceSummary from "../components/PriceSummary.jsx";

const Order = ({user}) => {
    const {cartItems, calculateTotal, clearCart} = useCart();
    const summary = calculateTotal();
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: '', address: '', cardNumber: '', expiry: '', cvc: ''
    });

    const handleInputChange = (e) => {
        const {name, value} = e.target;
        setFormData(prev => ({...prev, [name]: value}));
    };

    const handlePlaceOrder = (e) => {
        e.preventDefault();

        const orderData = {
            orderId: `ORD-${Date.now()}`, customer: {
                uid: user?.uid || "guest", email: user?.email || "Guest User"
            }, items: cartItems.map(item => ({
                productId: item.id,
                name: item.name,
                price: item.price,
                quantity: item.quantity,
                promotion: item.promotions || "None",
                subtotal: (item.price * item.quantity).toFixed(2),
                image: item.image
            })), summary: {
                subtotal: summary.subtotal,
                savings: summary.savings,
                shippingFee: summary.shippingFee,
                totalAmount: summary.total,
                totalItems: cartItems.reduce((acc, item) => acc + item.quantity, 0)
            }, shippingInfo: {
                name: formData.name, address: formData.address
            }, orderDate: new Date().toISOString()
        };

        const existingOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        localStorage.setItem('orderHistory', JSON.stringify([...existingOrders, orderData]));
        clearCart();

        alert('Order Confirmed!');
        navigate('/');
    };

    if (cartItems.length === 0) {
        return <Container className="py-5 text-center"><h3 className="text-center my-auto text-muted">
            <IoIceCream/> Scoop more <GiIceCreamScoop
            style={{transform: 'scaleX(-1)'}}/></h3></Container>;
    }

    if (!user) {
        return <Container className="py-5 text-center"><h3>You have to be logged in to order</h3></Container>;
    }

    return (<Container className="py-5">
        <h2 className="fw-bold mb-4">Checkout</h2>
        <Form onSubmit={handlePlaceOrder}>
            <Row>
                {/* Shipping, payment info */}
                <Col md={7}>
                    <Card className="shadow-sm border-0 mb-4 p-3">
                        <h5 className="fw-bold mb-3">Shipping Information</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Full Name</Form.Label>
                            <Form.Control name="name" required onChange={handleInputChange}
                                          placeholder="Badger"/>
                        </Form.Group>
                        <Form.Group className="mb-3">
                            <Form.Label>Address</Form.Label>
                            <Form.Control name="address" required onChange={handleInputChange}
                                          placeholder="1234 Madison St, WI"/>
                        </Form.Group>
                    </Card>

                    <Card className="shadow-sm border-0 p-3">
                        <h5 className="fw-bold mb-3">Payment Method</h5>
                        <Form.Group className="mb-3">
                            <Form.Label>Card Number</Form.Label>
                            <Form.Control name="cardNumber" required onChange={handleInputChange}
                                          placeholder="0000-0000-0000-0000"/>
                        </Form.Group>
                        <Row>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>Expiry</Form.Label>
                                    <Form.Control name="expiry" required onChange={handleInputChange}
                                                  placeholder="MM/YY"/>
                                </Form.Group>
                            </Col>
                            <Col>
                                <Form.Group className="mb-3">
                                    <Form.Label>CVC</Form.Label>
                                    <Form.Control name="cvc" required onChange={handleInputChange}
                                                  placeholder="123"/>
                                </Form.Group>
                            </Col>
                        </Row>
                    </Card>
                </Col>

                {/* Order Summary */}
                <Col md={5}>
                    <Card className="shadow-sm border-0 p-3 sticky-top" style={{top: '100px'}}>
                        <h5 className="fw-bold mb-3">Order Summary</h5>
                        <ListGroup variant="flush" className="mb-3">
                            {cartItems.map(item => (<ListGroup.Item key={item.id}
                                                                    className="px-0 d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <Image src={item.image} width={50} height={50} rounded className="me-2"/>
                                    <div>
                                        <div className="small fw-bold">{item.name}</div>
                                        <div className="small text-muted">Qty: {item.quantity}</div>
                                    </div>
                                </div>
                                <div className="small fw-bold">${(item.price * item.quantity).toFixed(2)}</div>
                            </ListGroup.Item>))}
                        </ListGroup>
                        <PriceSummary
                            summary={summary}
                            showButton={true}
                            buttonText="Place Order"
                            buttonType="submit"
                        />
                    </Card>
                </Col>
            </Row>
        </Form>
    </Container>);
};

export default Order;