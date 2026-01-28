import axios, { type InternalAxiosRequestConfig } from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
})

// Request interceptor - Complexity 1 (no branching)
apiClient.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const token = localStorage.getItem('access_token')
  config.headers.Authorization = token ? `Bearer ${token}` : ''
  return config
})

// Response interceptor - Auto-logout on auth failure
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('access_token')
      window.location.href = '/login'
    }
    return Promise.reject(error)
  }
)

export default apiClient
