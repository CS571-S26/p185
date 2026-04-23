import {Offcanvas, ListGroup, Button, Image, Stack} from 'react-bootstrap';
import {useCart} from '../contexts/CartContext';
import {IoIceCream} from "react-icons/io5";
import {GiIceCreamScoop} from "react-icons/gi";
import React from "react";
import {useNavigate} from 'react-router-dom';

const CartSidebar = ({show, handleClose, user}) => {

    const navigate = useNavigate();
    const {cartItems, updateQuantity, calculateTotal, clearCart} = useCart();
    const {subtotal, savings, shippingFee, total, isFreeShipping} = calculateTotal();

    const handleCheckout = () => {
        handleClose();
        if (user) {
            navigate('/order');
        } else {
            alert('You have to be logged in to order.');
            navigate('/login');
        }
    }

    return (<Offcanvas show={show} onHide={handleClose} placement="end">
        <Offcanvas.Header closeButton>
            <Offcanvas.Title className="fw-bold">Cart</Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body className="d-flex flex-column">
            {cartItems.length > 0 && (<Button
                variant="outline-danger"
                className="fw-bold sm ms-auto"
                onClick={clearCart}
            >
                Clear All
            </Button>)}
            {cartItems.length === 0 ? (
                <div className="text-center my-auto text-muted"><IoIceCream/> Scoop more <GiIceCreamScoop
                    style={{transform: 'scaleX(-1)'}}/></div>) : (<>
                <ListGroup variant="flush" className="flex-grow-1 overflow-auto">
                    {cartItems.map(item => (<ListGroup.Item key={item.id} className="py-3 border-0 border-bottom">
                        <Stack direction="horizontal" gap={3}>
                            <Image src={item.image} width={60} height={60} rounded/>

                            <div className="me-auto">
                                <div className="fw-bold small">{item.name}</div>
                                <div className="text-muted small">${item.price.toFixed(2)}</div>
                                {item.promotions === "2+1 Deal" && (
                                    <small className="text-danger fw-bold d-block">2+1 Deal!</small>)}
                            </div>

                            <Stack direction="horizontal" gap={2}>
                                <Button size="sm" variant="outline-secondary"
                                        onClick={() => updateQuantity(item.id, -1)}>-</Button>
                                <span className="small">{item.quantity}</span>
                                <Button size="sm" variant="outline-secondary"
                                        onClick={() => updateQuantity(item.id, 1)}>+</Button>
                            </Stack>
                        </Stack>
                    </ListGroup.Item>))}
                </ListGroup>

                <div className="mt-4 p-3 bg-light rounded">
                    <div className="d-flex justify-content-between small mb-1">
                        <span>Subtotal</span><span>${subtotal}</span>
                    </div>
                    {parseFloat(savings) > 0 && (<div className="d-flex justify-content-between small mb-1 text-danger">
                        <span>2+1 Savings</span><span>-${savings}</span>
                    </div>)}
                    <div className="d-flex justify-content-between small mb-1">
                        <span>Shipping</span>
                        <span>{isFreeShipping ? 'FREE' : `$${shippingFee}`}</span>
                    </div>
                    <hr/>
                    <div className="d-flex justify-content-between fw-bold fs-5">
                        <span>Total</span><span>${total}</span>
                    </div>
                    {!isFreeShipping && (<small className="text-muted text-center d-block mt-2">
                        Add ${(35 - parseFloat(total) + parseFloat(shippingFee)).toFixed(2)} more for FREE
                        shipping!
                    </small>)}
                    <Button
                        variant="danger"
                        className="w-100 mt-3 fw-bold py-2"
                        onClick={handleCheckout}
                    >
                        Checkout
                    </Button>
                </div>
            </>)}
        </Offcanvas.Body>
    </Offcanvas>);
};

export default CartSidebar;