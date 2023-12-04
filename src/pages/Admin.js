

import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Admin() {
    const [coffeeName, setCoffeeName] = useState('');
    const [smallPrice, setSmallPrice] = useState(0);
    const [mediumPrice, setMediumPrice] = useState(0);
    const [largePrice, setLargePrice] = useState(0);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const coffeeData = {
            coffee_name: coffeeName,
            prices: [smallPrice * 100, mediumPrice * 100, largePrice * 100],
        };

        try {
            const response = await fetch('https://batu.ardapektezol.com/api/coffee', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(coffeeData),
            });

            if (response.ok) {
                console.log('Coffee successfully added.');
                alert('Coffee successfully added.'); 
                setCoffeeName('');
                setSmallPrice(0);
                setMediumPrice(0);
                setLargePrice(0);
            } else {
                console.error('An error occurred while adding coffee.');
            }
        } catch (error) {
            console.error('An error occurred:', error);
        }
    };

    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/Home" className="navbar-brand">Apollo</Link>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item">
                            <Link to="/Order" className="nav-link">Give Order</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/CurrentOrder" className="nav-link">Current Orders</Link>
                        </li>
                        <li>
                            <Link to="/Admin" className="nav-link">Admin</Link>
                        </li>
                    </ul>
                    <ul className="navbar-nav ml-auto">
                        <li className="nav-item">
                            <Link to="/Login" className="nav-link">Sign Out</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <h2 className="text-center mb-4">Add New Coffee</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="form-group">
                                <label htmlFor="coffeeName">Coffee Name:</label>
                                <input type="text" className="form-control" id="coffeeName" placeholder="Coffee Name" value={coffeeName} onChange={(e) => setCoffeeName(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="largePrice">Large Size Price:</label>
                                <input type="number" className="form-control" id="largePrice" placeholder="Large Size Price" step="0.5" value={largePrice} onChange={(e) => setLargePrice(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="mediumPrice">Medium Size Price:</label>
                                <input type="number" className="form-control" id="mediumPrice" placeholder="Medium Size Price" step="0.5" value={mediumPrice} onChange={(e) => setMediumPrice(e.target.value)}/>
                            </div>
                            <div className="form-group">
                                <label htmlFor="smallPrice">Small Size Price:</label>
                                <input type="number" className="form-control" id="smallPrice" placeholder="Small Size Price" step="0.5" value={smallPrice} onChange={(e) => setSmallPrice(e.target.value)}/>
                            </div>
                            <button type="submit" className="btn btn-primary"> Add </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Admin;
