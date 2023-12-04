import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Login from './pages/Login.js';
import Order from './pages/Order.js';
import Home from './pages/Home.js';
import CurrentOrder from './pages/CurrentOrder';
import Admin from './pages/Admin';
import { Link } from 'react-router-dom';


const router = createBrowserRouter([
  {
    path: "/",
    element:<div className="container d-flex align-items-center justify-content-center" style={{ height: '100vh' }}>

    <button className="btn btn-primary"><div><Link to="/login" className="nav-link">Start Here</Link></div></button>
  </div>   
  },
  {
    path: "/login",
    element: <Login />
  },
  {
    path: "/order",
    element: <Order />
  },
  {
    path: "/home",
    element: <Home />
  },
  {
    path: "/currentorder",
    element: <CurrentOrder />
  },
  {
    path: "/admin",
    element: <Admin />
  },
]);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);

reportWebVitals();
