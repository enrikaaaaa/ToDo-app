import { API } from './consts';
import axios from 'axios';
const token = localStorage.getItem('token');

export const fetchTasks = () =>
  axios
    .get(`${API}/tasks`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((response) => response.data);

export const createTask = (newTask) =>
  axios.post(`${API}/tasks`, newTask).then((response) => response.data);

export const fetchTaskById = (id) =>
  axios.get(`${API}/tasks/${id}`).then((response) => response.data);

export const deleteTask = (id) => axios.delete(`${API}/tasks/${id}`);

export const updateTask = (taskId, updatedData) =>
  axios
    .put(`${API}/tasks/${taskId}`, updatedData)
    .then((response) => response.data);
