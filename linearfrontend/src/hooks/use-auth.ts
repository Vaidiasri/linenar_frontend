import { useNavigate } from 'react-router-dom'

export const useAuth = () => {
  const navigate = useNavigate()

  const isAuthenticated = (): boolean => {
    const token = localStorage.getItem('access_token')
    return !!token
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    navigate('/login')
  }

  return {
    isAuthenticated: isAuthenticated(),
    logout,
  }
}
