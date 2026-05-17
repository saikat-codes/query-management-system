import axios from 'axios';
import { data } from 'react-router-dom';

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/queries'

export const submitQuery = (data) => axios.post(BASE_URL, data);
export const getAllQueries = () => axios.get(BASE_URL);
export const updateQuery = (id, status) => axios.put(`${BASE_URL}/${id}`, { status });
export const deleteQuery = (id) => axios.delete(`${BASE_URL}/${id}`);
