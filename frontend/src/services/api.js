import axios from 'axios';

// Supondo que authKey seja uma string exportada de @contexts/AuthContext
import { AUTH_STORAGE_KEY } from './contexts/AuthContext';

export const API = axios.create({
  baseURL: import.meta.env.VITE_BASE_URL,
});

API.interceptors.request.use(function (config) {
  const storageUserData = localStorage.getItem(AUTH_STORAGE_KEY);

  if (storageUserData) {
    try {
      const data = JSON.parse(storageUserData);
      config.headers.Authorization = data.accessToken
        ? `Bearer ${data.accessToken}`
        : '';
    } catch (error) {
      console.error('Erro ao analisar os dados do localStorage:', error);
    }
  }

  return config;
});

export const brazilAPI = axios.create({
  baseURL: 'https://brasilapi.com.br/api/',
});