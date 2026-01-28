import { useNavigate } from 'react-router-dom'

/**
 * Authentication hook for checking auth status and handling logout
 * Complexity: 1 (simple token check and removal)
 */
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
