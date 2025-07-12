import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}users/auth/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}users/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}users/auth/register`, userData);
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await axios.get(`${API_URL}users/auth/me`, {
    withCredentials: true,
  });
  return response.data;
};

export const requestResetPassword = async (email) => {
  const response = await axios.post(`${API_URL}auth/request-password-reset`, {
    email,
  });
  return response.data;
};

export const resetPassword = async (token, newPassword) => {
  const response = await axios.post(`${API_URL}auth/reset-password`, {
    token,
    newPassword,
  });
  return response.data;
};
