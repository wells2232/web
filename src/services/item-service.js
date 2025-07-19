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

  const queryParams = new URLSearchParams(cleanParams).toString();
  const finalUrl = `${API_URL}/items?${queryParams}`;

  const { data } = await axios.get(finalUrl);
  return data; // Retorna o objeto completo { items: [...], totalPages, ... }
};
