import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/queries'

export const submitQuery = (data) => {
  console.log('API call: sending new support query data...');
  return axios.post(BASE_URL, data, { withCredentials: true })
}

export const getAllQueries = () => {
  console.log('API call: pulling all queries from database...');
  return axios.get(BASE_URL, { withCredentials: true })
}

export const updateQuery = (id, status) => {
  console.log('API call: updating item status for ID:', id, 'to:', status);
  return axios.put(`${BASE_URL}/${id}`, { status }, { withCredentials: true })
}

export const deleteQuery = (id) => {
  console.log('API call: dropping item entry matching ID:', id);
  return axios.delete(`${BASE_URL}/${id}`, { withCredentials: true })
}
