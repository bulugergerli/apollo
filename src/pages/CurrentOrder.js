import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function CurrentOrder() {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        // Fetch data from the API
        fetch('https://batu.ardapektezol.com/api/order')
            .then((response) => response.json())
            .then((data) => setOrders(data.data.slice(0, 10)))
            .catch((error) => console.error('Error fetching data:', error));
    }, []);

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/Home" className="navbar-brand">Apollo</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li>
                            <Link to="/Order" className="nav-link">Give Order</Link>
                        </li>
                        <li>
                            <Link to="/CurrentOrder" className="nav-link">Current Orders</Link>
                        </li>
                        <li>
                            <Link to="/Admin" className="nav-link">Admin</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li>
                            <Link to="/Login" className="nav-link">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container">
                <h2 className="mt-4 mb-4">Order Control</h2>
                {orders.map((order) => (
                    <div key={order.id} className="card order-card">
                        <div className="card-body">
                            <h5 className="card-title">Order ID: {order.id}</h5>
                            <p className="card-text">Total Coffees: {order.coffee_order.length}</p>
                            <p className="card-text"> Order:{' '} {order.coffee_order.map((coffee) => (
                                    <span key={coffee.name}>{coffee.name} ({coffee.size}, {coffee.price / 100} TL){' '}</span>
                                ))}
                            </p>
                            <p className="card-text">Delivery Date: {order.order_date}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default CurrentOrder;
