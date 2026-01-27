import axios from 'axios'

const linearClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL || 'https://api.linear.app',
  headers: {
    Authorization: `Bearer ${import.meta.env.VITE_LINEAR_API_KEY}`,
    'Content-Type': 'application/json',
  },
})

export default linearClient
