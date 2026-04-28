import React from 'react';
import {Accordion, Table, Badge, Image, Row, Col} from 'react-bootstrap';
import {BsCalendar3} from 'react-icons/bs';

const OrderItem = ({order, eventKey}) => {
    return (<Accordion.Item eventKey={eventKey} className="border-0 mb-3 shadow-sm rounded overflow-hidden">
        <Accordion.Header>
            <div className="w-100 d-flex justify-content-between align-items-center pe-3">
                <div>
                    <span className="fw-bold text-danger me-2">{order.orderId}</span>
                    <small className="text-muted">
                        <BsCalendar3 size={14} className="me-1"/>
                        {new Date(order.orderDate).toLocaleDateString()}
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
                    <p className="small text-muted"><strong>Ordered by:</strong> {order.customer.email}</p>
                </Col>
                <Col sm={6}>
                    <h6 className="fw-bold border-bottom pb-2">Order Summary</h6>
                    <div className="d-flex justify-content-between small">
                        <span>Subtotal:</span><span>${order.summary.subtotal}</span>
                    </div>
                    <div className="d-flex justify-content-between small text-danger">
                        <span>Savings:</span><span>-${order.summary.savings}</span>
                    </div>
                    <div className="d-flex justify-content-between small">
                        <span>Shipping:</span><span>${order.summary.shippingFee}</span>
                    </div>
                </Col>
            </Row>

            <Table responsive hover className="align-middle">
                <thead className="bg-light">
                <tr className="small text-uppercase text-muted">
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
                            <Image src={item.image} width={40} height={40} rounded className="me-2"/>
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
    </Accordion.Item>);
};

export default OrderItem;