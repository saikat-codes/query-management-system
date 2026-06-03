import axios from 'axios'

const BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api/queries'

export const submitQuery  = (data) => axios.post(BASE_URL, data, { withCredentials: true })
export const getAllQueries = () => axios.get(BASE_URL, { withCredentials: true })
export const updateQuery  = (id, status) => axios.put(`${BASE_URL}/${id}`, { status }, { withCredentials: true })
export const deleteQuery  = (id) => axios.delete(`${BASE_URL}/${id}`, { withCredentials: true })
