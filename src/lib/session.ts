import axios from './axios';

export const isValidToken = (token: string) => {
  if (!token) {
    return false;
  }
  return true;
};

// ---------------------------------------------------------------------

// ----------------------------------------------------------------------

export const setSession = (token: string | null) => {
  if (token) {
    localStorage.setItem('token', token);
    // axios.defaults.headers.common.Authorization = `Bearer ${token}`;
  } else {
    localStorage.removeItem('token');
    delete axios.defaults.headers.common.Authorization;
  }
};
