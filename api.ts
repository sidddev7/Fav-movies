import axios from 'axios';

let baseURL = 'https://api.themoviedb.org/3';

export const currentURL = baseURL;
const API = axios.create({
  baseURL,
  responseType: 'type',
});

export default API;
// Axios Request interceptors
API.interceptors.request.use(req => {
  req.headers = {
    Authorization:
      'Bearer ' +
      'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI4NmQ2YzJhNWY0ZGQxZTNjMDY2ZDI1YTc3ZmQyMzBkMyIsInN1YiI6IjY0ZDY4MGUyZjQ5NWVlMDI5MjRlM2JlMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.1blWJRT0GTSwT4FoV1jDimXVLJ-mjTthGWzNqFv0Ba8',
  };
  if (process.env.NODE_ENV === 'development') {
  }
  return req;
});

API.interceptors.response.use(
  res => {
    if (process.env.NODE_ENV === 'development') {
    }
    return res;
  },
  err => {
    if (process.env.NODE_ENV === 'development') {
    }
    if (err?.response?.status === 400) {
      // NotificationMessage("error", err?.response?.data?.message);
    }
    if (err?.response?.status === 404) {
      NotificationMessage('error', err?.response?.data?.message);
    }
    if (err?.response?.status === 422) {
      if (
        err &&
        err.response &&
        err.response.data &&
        err.response.data.errors &&
        err.response.data.errors.length > 0
      ) {
        err.response.data.errors.map((text, i) => {
          return Object.keys(text).forEach(function (key) {
            return NotificationMessage('error', `${text[key]}`);
          });
        });
      } else {
        NotificationMessage('error', err.response.data.message);
      }
    }
    if (err?.response?.status === 500) {
      NotificationMessage('error', err?.response?.data?.message);
    }
    if (err?.response?.status === 403) {
      NotificationMessage('error', err?.response?.data?.message);
    }
    if (err?.response?.status === 401) {
      NotificationMessage('error', err?.response?.data?.message);
      localStorage.removeItem('token');
      history.push('/');
      window.location.reload();
    } else {
      // NotificationMessage("error", "internal Server Error");
    }
    return err;
  },
);
