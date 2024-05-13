import { API } from './consts';
import axios from 'axios';

export const fetchPriority = () =>
  axios.get(`${API}/priority`).then((response) => response.data);

export const createPriority = (newPriority) =>
  axios.post(`${API}/priority`, newPriority).then((response) => response.data);

export const fetchPriorityById = (id) =>
  axios.get(`${API}/priority/${id}`).then((response) => response.data);

export const deletePriority = (id) => axios.delete(`${API}/priority/${id}`);

export const updatePriority = (priorityId, updatedData) =>
  axios
    .put(`${API}/priority/${priorityId}`, updatedData)
    .then((response) => response.data);
