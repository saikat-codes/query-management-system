import axios from 'axios'

const BASE_URL = import.meta.env.VITE_BASE_URL || 'http://localhost:5000'

export const loginUser = (data) => axios.post(`${BASE_URL}/api/auth/login`, data, { withCredentials: true })
export const logoutUser = () => axios.post(`${BASE_URL}/api/auth/logout`, {}, { withCredentials: true })
export const getMe = () => axios.get(`${BASE_URL}/api/auth/me`, { withCredentials: true })
export const getMyQueries = () => axios.get(`${BASE_URL}/api/queries/my`, { withCredentials: true })
