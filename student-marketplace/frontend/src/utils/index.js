import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_URL || 'https://gened-1192-mock-app.onrender.com/api';
const SESSION_KEY = 'campuscycle-session';

export const fetchListings = async (params = {}) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/listings`, { params });
    return response.data;
  } catch (error) {
    console.error('Error fetching listings:', error);
    throw error;
  }
};

export const createListing = async (listingData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/listings`, listingData);
    return response.data;
  } catch (error) {
    console.error('Error creating listing:', error);
    throw error;
  }
};

export const deleteListing = async (listingId, sellerId) => {
  try {
    const response = await axios.delete(`${API_BASE_URL}/listings/${listingId}`, {
      params: { sellerId },
    });
    return response.data;
  } catch (error) {
    console.error('Error deleting listing:', error);
    throw error;
  }
};

export const fetchUserProfile = async (userId) => {
  try {
    const response = await axios.get(`${API_BASE_URL}/users/${userId}`);
    return response.data;
  } catch (error) {
    console.error('Error fetching user profile:', error);
    throw error;
  }
};

export const registerAccount = async (userData) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/users`, userData);
    return response.data;
  } catch (error) {
    console.error('Error creating account:', error);
    throw error;
  }
};

export const loginAccount = async (credentials) => {
  try {
    const response = await axios.post(`${API_BASE_URL}/auth/login`, credentials);
    return response.data;
  } catch (error) {
    console.error('Error logging in:', error);
    throw error;
  }
};

export const getStoredSession = () => {
  const stored = window.localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

export const storeSession = (user) => {
  window.localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

export const clearSession = () => {
  window.localStorage.removeItem(SESSION_KEY);
};

export const formatPrice = (price) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(price);
};
