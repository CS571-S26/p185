import React, {useState, useEffect} from 'react';
import {Container, Table, Badge, Accordion, Image, Row, Col} from 'react-bootstrap';
import {BsBagCheck, BsCalendar3, BsReceipt} from 'react-icons/bs';
import OrderItem from "../components/OrderItem.jsx";

const OrderHistory = ({user}) => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const allOrders = JSON.parse(localStorage.getItem('orderHistory') || '[]');
        const myOrders = allOrders.filter(order => order.customer.email === user?.email);
        // eslint-disable-next-line react-hooks/set-state-in-effect
        setOrders(myOrders.reverse());
    }, [user]);

    if (!user) {
        return <Container className="py-5 text-center"><h3>You have to be logged in to view your order</h3></Container>;
    }

    if (orders.length === 0) {
        return (<Container className="py-5 text-center">
            <h1 className="visually-hidden">Order History page</h1>
            <h2 className="visually-hidden">No items to view</h2>
            <div className="text-muted mb-3"><BsBagCheck size={50}/></div>
            <h3>You haven't ordered anything yet</h3>
            <p>Scoop some ice cream in our store!</p>
        </Container>);
    }

    return (<Container className="py-5">
        <div className="d-flex align-items-center mb-4">
            <BsReceipt size={30} className="text-danger me-2"/>
            <h1 className="visually-hidden">Order History page</h1>
            <h2 className="fw-bold m-0">My Order History</h2>

        </div>

        <Accordion defaultActiveKey="0" className="shadow-sm">
            {orders.map((order, index) => (<OrderItem
                key={order.orderId}
                order={order}
                eventKey={index.toString()}
            />))}
        </Accordion>
    </Container>);
};

export default OrderHistory;