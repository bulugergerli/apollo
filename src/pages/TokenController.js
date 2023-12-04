import axios from 'axios';

const API_URL = 'https://batu.ardapektezol.com/api';

const saveTokenToLocalStorage = (token) => {
  localStorage.setItem('myToken', token);
};

export const deneme = async (email, password) => {
  try {
    const response = await axios.post(`${API_URL}/login`, {
      email,
      password,
    });
    

    if (response.data.success) {
      saveTokenToLocalStorage(response.data.token);
      return response.data.data;
    } else {
      throw new Error(response.data.message);
    }
  } catch (error) {
    throw new Error('Login failed');
  }
};  