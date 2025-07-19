import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const fetchCategories = async () => {
  const { data } = await axios.get(`${API_URL}/categories`);
  return data;
};

export const fetchItemConditions = async () => {
  const { data } = await axios.get(`${API_URL}/item-conditions`);
  return data;
};
