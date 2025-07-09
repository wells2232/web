/** biome-ignore-all lint/suspicious/noConsole: porque sim */
import { useMutation } from '@tanstack/react-query';
import axios from 'axios';

const API_URL = 'http://localhost:3000/api/';

export function useLogin() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}users/auth/login`, data, {
        withCredentials: true,
      });

      return response.data;
    },
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data) => {
      const response = await axios.post(`${API_URL}users/auth/register`, data, {
        withCredentials: true,
      });

      return response;
    },
  });
}
