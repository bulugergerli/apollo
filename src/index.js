import 'bootstrap/dist/css/bootstrap.css';
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import reportWebVitals from './reportWebVitals';
import {
  createBrowserRouter,
} from "react-router-dom";
import Login from './pages/Login.js';
import Order from './pages/Order.js';
import Home from './pages/Home.js';
import CurrentOrder from './pages/CurrentOrder';
import Admin from './pages/Admin';




const router = createBrowserRouter([

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
    <Login />  
  </React.StrictMode>
);

reportWebVitals();
