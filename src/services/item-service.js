import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const createItem = async (item) => {
  const response = await axios.post(`${API_URL}/items`, item, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchItems = async (params) => {
  const cleanParams = {};
  for (const key in params) {
    if (params[key] !== null && params[key] !== '') {
      cleanParams[key] = params[key];
    }
  }
  console.log('Fetching items with params:', cleanParams);

  const queryParams = new URLSearchParams(cleanParams).toString();
  const finalUrl = `${API_URL}/items?${queryParams}`;

  const { data } = await axios.get(finalUrl);
  return data; // Retorna o objeto completo { items: [...], totalPages, ... }
};

export const fetchUserItems = async (userId) => {
  const response = await axios.get(`${API_URL}/items/user/${userId}`, {
    withCredentials: true,
  });
  return response.data; // Retorna o objeto completo { items: [...]
};

export const fetchItemById = async (id) => {
  const response = await axios.get(`${API_URL}/items/${id}`);
  return response.data; // Retorna o objeto completo { item: {...} }
};
