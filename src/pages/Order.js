import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Order() {
  const [showDateTimePicker, setShowDateTimePicker] = useState(false);
  const [coffeeAmount, setCoffeeAmount] = useState(1);
  const [selectedCoffees, setSelectedCoffees] = useState([]);
  const [coffeeData, setCoffeeData] = useState([]);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [selectedDateTime, setSelectedDateTime] = useState('');
  const [latestOrderDetails, setLatestOrderDetails] = useState(null);

  useEffect(() => {
    fetch('https://batu.ardapektezol.com/api/coffee')
      .then((response) => response.json())
      .then((data) => setCoffeeData(data.data.coffees))
      .catch((error) => console.error('API Error:', error));
  }, []);

  const handleDateTimeSelectionChange = (event) => {
    setShowDateTimePicker(event.target.value === 'later');
  };

  const handleAmountChange = (event) => {
    const amount = parseInt(event.target.value, 10) || 1;
    setCoffeeAmount(amount);
    setSelectedCoffees([]);
  };

  const handleCoffeeChange = (index, event) => {
    const newCoffees = [...selectedCoffees];
    newCoffees[index] = event.target.value;
    setSelectedCoffees(newCoffees);
  };

  const handleDateTimeChange = (event) => {
    setSelectedDateTime(event.target.value);
  };

  const renderThankYouMessage = () => {
    if (orderPlaced) {
      return <div className="alert alert-success">Thank you! Your order has been placed.</div>;
    }
    return null;
  };

  const renderLatestOrderDetails = () => {
    if (latestOrderDetails) {
      const { id, coffee_order, creation_date } = latestOrderDetails;
      const orderDate = new Date(creation_date).toLocaleString();

      return (
        <div className="text-center">
          <h2>Latest Order Details</h2>
          <p><strong>Order ID:</strong> {id}</p>
          <p><strong>Order Date:</strong> {orderDate}</p>
          <p><strong>Order Details:</strong> </p>
          <ul>
            {coffee_order.map((coffee) => (
              <li key={`${coffee.name}-${coffee.size}`}>
                {`${coffee.name}, ${coffee.size}, ${(coffee.price / 100).toFixed(2)}`}
              </li>
            ))}
          </ul>
        </div>
      );
    }
    return null;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const coffeeOrder = selectedCoffees.map((type) => {
      const [coffeeName, sizeName, sizeId] = type.split('-');
      const coffeeInfo = coffeeData.find((coffee) => coffee.name === coffeeName);

      if (coffeeInfo) {
        const sizeInfo = coffeeInfo.sizes.find((size) => size.name === sizeName && size.id === parseInt(sizeId));

        if (sizeInfo) {
          return {
            coffee_id: coffeeInfo.id,
            size_id: sizeInfo.id,
            quantity: coffeeAmount,
          };
        }
      }

      console.error(`Valid information not found: coffeeName=${coffeeName}, sizeName=${sizeName}, sizeId=${sizeId}`);
      return null;
    });

    if (coffeeOrder.length === 0) {
      console.error('Valid coffee order not found.');
      return;
    }

    const orderData = {
      customer_email: 'batu@gmail.com',
      coffee_order: coffeeOrder.map((order) => order.size_id),
      pickup_time: selectedDateTime,
    };

    try {
      const response = await fetch('https://batu.ardapektezol.com/api/order', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(orderData),
      });

      if (response.ok) {
        console.log('Order successfully placed.');
        setOrderPlaced(true);

        const latestOrderResponse = await fetch('https://batu.ardapektezol.com/api/order');
        const latestOrderData = await latestOrderResponse.json();
        if (latestOrderData.success && latestOrderData.data.length > 0) {
          setLatestOrderDetails(latestOrderData.data[0]);
        }
      } else {
        const errorText = await response.text();
        console.error('Error placing order:', response.status, errorText);
      }
    } catch (error) {
      console.error('Error placing order:', error.message);
    }
  };

  const renderCoffeeFields = () => {
    return Array.from({ length: coffeeAmount }, (_, index) => (
      <div className="form-group" key={index}>
        <label htmlFor={`coffeeType${index}`}>{`Coffee Type #${index + 1}:`}</label>
        <select
          className="form-control"
          id={`coffeeType${index}`}
          name={`coffeeType${index}`}
          onChange={(event) => handleCoffeeChange(index, event)}
          value={selectedCoffees[index] || ''}
        >
          <option value="" disabled>Select</option>
          {coffeeData.map((coffee) => (
            coffee.sizes.map((size) => (
              <option key={`${coffee.id}-${size.id}`} value={`${coffee.name}-${size.name}-${size.id}`}>
                {`${coffee.name}, ${size.name}, ${(size.price / 100).toFixed(2)}`}
              </option>
            ))
          ))}
        </select>
      </div>
    ));
  };

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
              <Link to="/" className="nav-link">Sign Out</Link>
            </li>
          </ul>
        </div>
      </nav>
      <div className="container form-container">
        <div className="row">
          <div className="col-md-6 offset-md-3">
            <h1 className="text-center">Coffee Sales Website</h1>

            {orderPlaced ? (
              renderThankYouMessage()
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="coffeeAmount">Coffee Amount:</label>
                  <input type="number" className="form-control" id="coffeeAmount" name="coffeeAmount" min="1" value={coffeeAmount} onChange={handleAmountChange} required
                  />
                </div>

                <div className="form-group" id="dateTimeSelection" style={{ display: showDateTimePicker ? 'block' : 'none' }}>
                  <label htmlFor="dateTime">Date and Time Selection:</label>
                  <input type="datetime-local" className="form-control" id="dateTime" name="dateTime" value={selectedDateTime} onChange={handleDateTimeChange} /></div>

                <div className="form-group">
                  <label>When do you want to pick it up?</label>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="nowRadio" name="dateTimeSelection" value="now" checked={!showDateTimePicker} onChange={handleDateTimeSelectionChange} />
                    <label className="form-check-label" htmlFor="nowRadio">Now</label>
                  </div>
                  <div className="form-check">
                    <input type="radio" className="form-check-input" id="laterRadio" name="dateTimeSelection" value="later" checked={showDateTimePicker} onChange={handleDateTimeSelectionChange} />
                    <label className="form-check-label" htmlFor="laterRadio">Later</label>
                  </div>
                </div>

                {renderCoffeeFields()}

                <button type="submit" className="btn btn-primary btn-block">Add to Cart</button>
              </form>
            )}
          </div>
        </div>
      </div>
      {renderLatestOrderDetails()}
    </div>
  );
}

export default Order;
