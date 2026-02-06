import { useState } from 'react'
import { LoginSchema, RegisterSchema } from '@/types/auth'
import { formatZodErrors } from '@/lib/utils'
import { useLoginMutation, useRegisterMutation } from '@/store/api/apiSlice'

/**
 * Custom hook for handling authentication form state and mutations
 * Manages login and registration flows with validation and error handling
 * Complexity: 1 (complex logic delegating to apiSlice)
 */
export function useAuthForm() {
  const [activeTab, setActiveTab] = useState('login')

  // Form States
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [newName, setNewName] = useState('')
  const [newEmail, setNewEmail] = useState('')
  const [newPassword, setNewPassword] = useState('')

  // Validation Errors
  const [errors, setErrors] = useState<Record<string, string>>({})

  // Login Mutation
  const [login, { isLoading: isLoginLoading }] = useLoginMutation()
  // Register Mutation
  const [register, { isLoading: isRegisterLoading }] = useRegisterMutation()

  const handleLogin = async () => {
    // Validate with Zod
    const result = LoginSchema.safeParse({ email, password })

    if (!result.success) {
      setErrors(formatZodErrors(result.error))
      return
    }

    setErrors({}) // Clear errors
    try {
      const data = await login({ email, password }).unwrap()
      console.log('Login Successful:', data)
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        window.location.href = '/'
      }
    } catch (error) {
      console.error('Login Failed:', error)
      const msg =
        (error as { data?: { detail?: string } })?.data?.detail ||
        'Login failed. Please check your credentials.'
      setErrors({ root: msg })
    }
  }

  const handleRegister = async () => {
    const result = RegisterSchema.safeParse({
      name: newName,
      email: newEmail,
      password: newPassword,
    })

    if (!result.success) {
      setErrors(formatZodErrors(result.error))
      return
    }

    setErrors({}) // Clear errors
    try {
      const data = await register({
        name: newName,
        email: newEmail,
        password: newPassword,
      }).unwrap()
      console.log('Register Successful:', data)
      setActiveTab('login')
      setEmail(newEmail)
      setPassword(newPassword)
      setErrors({})
      alert('Registration successful! Please login.')
    } catch (error) {
      console.error('Register Failed:', error)
      const msg = (error as { data?: { detail?: string } })?.data?.detail || 'Registration failed.'
      setErrors({ root: msg })
    }
  }

  return {
    activeTab,
    setActiveTab,
    loginData: { email, setEmail, password, setPassword },
    registerData: { newName, setNewName, newEmail, setNewEmail, newPassword, setNewPassword },
    errors,
    handleLogin,
    handleRegister,
    isLoading: isLoginLoading || isRegisterLoading,
  }
}
