import { API } from './consts';
import axios from 'axios';

export const fetchUsers = () =>
  axios.get(`${API}/users`).then((response) => response.data);

export const createUser = (newUser) =>
  axios.post(`${API}/users`, newUser).then((response) => response.data);

export const fetchUserById = (id) =>
  axios.get(`${API}/users/${id}`).then((response) => response.data);

export const deleteUser = (id) => axios.delete(`${API}/users/${id}`);

export const updateUser = (userId, updatedData) =>
  axios
    .put(`${API}/users/${userId}`, updatedData)
    .then((response) => response.data);

export const loginUser = (loginData) =>
  axios.post(`${API}/login`, loginData).then((response) => response.data);
