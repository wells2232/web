import axios from 'axios';

const API_URL = 'http://localhost:3000/api';

export const getCloudinarySignature = async () => {
  const { data } = await axios.get(`${API_URL}/upload/signature`, {
    withCredentials: true,
  });
  return data; // Deve retornar { signature, timestamp }
};

export const uploadToCloudinary = async (file, signature, timestamp) => {
  const formData = new FormData();
  formData.append('file', file);
  formData.append('signature', signature);
  formData.append('timestamp', timestamp);
  formData.append('api_key', import.meta.env.VITE_CLOUDINARY_API_KEY);
  formData.append('folder', 'trade-app-items');

  const CLOUDINARY_URL = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUDINARY_CLOUD_NAME}/image/upload`;

  const { data } = await axios.post(CLOUDINARY_URL, formData);
  return data;
};
