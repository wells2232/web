import axios from 'axios';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

export const createProposal = async (data) => {
  const response = await axios.post(`${API_BASE_URL}/proposals/create`, data, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchUserProposals = async () => {
  const response = await axios.get(`${API_BASE_URL}/proposals/made`, {
    withCredentials: true,
  });
  return response.data;
};

export const fetchReceivedProposals = async () => {
  const response = await axios.get(`${API_BASE_URL}/proposals/received`, {
    withCredentials: true,
  });
  return response.data;
};

export const acceptProposal = async (proposalId) => {
  const response = await axios.post(
    `${API_BASE_URL}/proposals/accept/${proposalId}`,
    {},
    { withCredentials: true }
  );
  return response.data;
};
