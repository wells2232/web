import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export const loginUser = async (credentials) => {
  const response = await axios.post(`${API_URL}user/auth/login`, credentials, {
    withCredentials: true,
  });
  return response.data;
};

export const logoutUser = async () => {
  const response = await axios.post(
    `${API_URL}user/auth/logout`,
    {},
    {
      withCredentials: true,
    }
  );
  return response.data;
};

export const registerUser = async (userData) => {
  const response = await axios.post(`${API_URL}user/auth/register`, userData, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchCurrentUser = async () => {
  const response = await axios.get(`${API_URL}user/auth/me`, {
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

export const updateUser = async (userData) => {
  const userId = userData.userId;
  const response = await axios.patch(
    `${API_URL}user/update/${userId}`,
    userData,
    {
      withCredentials: true,
    }
  );
  console.log('Usuário atualizado:', response.data);
  return response.data;
};
