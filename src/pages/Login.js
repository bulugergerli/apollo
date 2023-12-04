import React, { useState } from 'react';
import axios from 'axios';
import { deneme } from '../pages/TokenController';

function Login() {
  const [registerFormData, setRegisterFormData] = useState({
    first_name: '',
    last_name: '',
    user_name: '',
    email: '',
    password: ''
  });

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleRegisterChange = (e) => {
    setRegisterFormData({ ...registerFormData, [e.target.id]: e.target.value });
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://batu.ardapektezol.com/api/register', registerFormData);
      console.log('Registration Successful:', response.data);
      alert('Registration Successful.');
    } catch (error) {
      console.error('Registration Error:', error.response.data);
      alert('Registration Failed.');
    }
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = await deneme(email, password);
      localStorage.setItem('token', token);
      console.log(token)
      console.log('Login successful');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  const handleLogin = async () => {
    try {
      console.log('Login submitted');
    } catch (error) {
      console.error('Login failed:', error.message);
    }
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <p className="navbar-brand ml-auto" href="#">Apollo</p>
        <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNav">
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="card">
              <div className="card-header"> Sign Up / Log In </div>
              <div className="card-body">
                <div className="row">
                  <div className="col-md-6">
                    <h5>Sign Up</h5>
                    <form onSubmit={handleRegisterSubmit}>
                      <div className="form-group">
                        <label htmlFor="registerInputName">First Name:</label>
                        <input type="text" className="form-control" id="first_name" placeholder="Enter your first name" onChange={handleRegisterChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="registerInputSurname">Last Name:</label>
                        <input type="text" className="form-control" id="last_name" placeholder="Enter your last name" onChange={handleRegisterChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="registerInputNickname">Nickname:</label>
                        <input type="text" className="form-control" id="user_name" placeholder="Enter your nickname" onChange={handleRegisterChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="registerInputEmail">Email:</label>
                        <input type="email" className="form-control" id="email" placeholder="Enter your email address" onChange={handleRegisterChange} required />
                      </div>
                      <div className="form-group">
                        <label htmlFor="registerInputPassword">Password:</label>
                        <input type="password" className="form-control" id="password" placeholder="Enter your password" onChange={handleRegisterChange} required />
                      </div>
                      <button type="submit" className="btn btn-primary">Sign Up</button>
                    </form>
                  </div>
                  <div className="col-md-6">
                    <h5>Log In</h5>
                    <form onSubmit={handleLoginSubmit}>
                      <div className="form-group">
                        <label htmlFor="loginInputEmail">Email:</label>
                        <input type="text" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)}/>
                      </div>
                      <div className="form-group">
                        <label htmlFor="loginInputPassword">Password:</label>
                        <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)}/>
                      </div>
                      <button onClick={handleLogin} type="submit" className="btn btn-primary">Log In</button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
