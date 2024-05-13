import { API } from './consts';
import axios from 'axios';

export const fetchStatus = () =>
  axios.get(`${API}/status`).then((response) => response.data);

export const fetchStatusById = (id) =>
  axios.get(`${API}/status/${id}`).then((response) => response.data);
