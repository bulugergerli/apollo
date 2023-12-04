import React from 'react';
import { Link } from "react-router-dom"

function Home() {
    
    return (
        <div>
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <Link to="/Home" className="navbar-brand">Apollo</Link>
                <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
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
                            <Link to="/Login" className="nav-link">Sign out</Link>
                        </li>
                    </ul>
                </div>
            </nav>

            <div className="container mt-5">
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card">
                            <div className="card-header">Home Page </div>
                            <div className="card-body">
                                <h5 className="card-title">Welcome!</h5>
                                <p className="card-text">You can choose one of the buttons above to log in or register on the site.</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default Home;
