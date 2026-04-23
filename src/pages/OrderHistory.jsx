import React, {useState, useEffect} from 'react';
import {Container, Table, Badge, Accordion, Image, Row, Col} from 'react-bootstrap';
import {BsBagCheck, BsCalendar3, BsReceipt} from 'react-icons/bs';

const OrderHistory = ({user}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const allOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const myOrders = allOrders.filter(order =>
            order.customer.email === user?.email
        );
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrders(myOrders.reverse());
    }, [user]);

    if (!user) {
        return <Container className="py-5 text-center"><h3>You have to be logged in to view your order</h3></Container>;
    }

    if (orders.length === 0) {
        return (<Container className="py-5 text-center">
            <div className="text-muted mb-3"><BsBagCheck size={50}/></div>
            <h3>You haven't ordered anything yet</h3>
            <p>Scoop some ice cream in our store!</p>
        </Container>);
    }

    return (<Container className="py-5">
        <div className="d-flex align-items-center mb-4">
            <BsReceipt size={30} className="text-danger me-2"/>
            <h2 className="fw-bold m-0">My Order History</h2>
        </div>

        <Accordion defaultActiveKey="0" className="shadow-sm">
            {orders.map((order, index) => (<Accordion.Item eventKey={index.toString()} key={order.orderId}
                                                           className="border-0 mb-3 shadow-sm rounded overflow-hidden">
                <Accordion.Header>
                    <div className="w-100 d-flex justify-content-between align-items-center pe-3">
                        <div>
                            <span className="fw-bold text-danger me-3">{order.orderId}</span>
                            <small className="text-muted"><BsCalendar3 size={14}
                                                                       className="me-2"/>{new Date(order.orderDate).toLocaleDateString()}
                            </small>
                        </div>
                        <div className="fw-bold text-dark">
                            Total: ${order.summary.totalAmount}
                        </div>
                    </div>
                </Accordion.Header>
                <Accordion.Body className="bg-white">
                    <Row className="mb-3">
                        <Col sm={6}>
                            <h6 className="fw-bold border-bottom pb-2">Shipping Details</h6>
                            <p className="small mb-1"><strong>To:</strong> {order.shippingInfo.name}</p>
                            <p className="small mb-1"><strong>Address:</strong> {order.shippingInfo.address}</p>
                            <p className="small text-muted"><strong>Email:</strong> {order.customer.email}
                            </p>
                        </Col>
                        <Col sm={6}>
                            <h6 className="fw-bold border-bottom pb-2">Order Summary</h6>
                            <div className="d-flex justify-content-between small">
                                <span>Subtotal:</span><span>${order.summary.subtotal}</span></div>
                            <div className="d-flex justify-content-between small text-danger">
                                <span>Savings:</span><span>-${order.summary.savings}</span></div>
                            <div className="d-flex justify-content-between small">
                                <span>Shipping:</span><span>${order.summary.shippingFee}</span></div>
                        </Col>
                    </Row>

                    <Table responsive hover className="align-middle">
                        <thead>
                        <tr className="text-uppercase">
                            <th>Product</th>
                            <th>Qty</th>
                            <th>Promotion</th>
                            <th className="text-end">Subtotal</th>
                        </tr>
                        </thead>
                        <tbody>
                        {order.items.map((item, idx) => (<tr key={idx}>
                            <td>
                                <div className="d-flex align-items-center">
                                    <Image src={item.image} width={40} height={40} rounded
                                           className="me-2"/>
                                    <span className="small fw-bold">{item.name}</span>
                                </div>
                            </td>
                            <td>{item.quantity}</td>
                            <td>
                                {item.promotion !== "None" ? (
                                    <Badge bg="info" className="fw-normal">{item.promotion}</Badge>) : "-"}
                            </td>
                            <td className="text-end fw-bold">${item.subtotal}</td>
                        </tr>))}
                        </tbody>
                    </Table>
                </Accordion.Body>
            </Accordion.Item>))}
        </Accordion>
    </Container>);
};

export default OrderHistory;