import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { LoginSchema, RegisterSchema } from '@/types/auth'
import type { LoginPayload, RegisterPayload } from '@/types/auth'
import { formatZodErrors } from '@/lib/utils'
import apiClient from '@/api/axios'

/**
 * Custom hook for handling authentication form state and mutations
 * Manages login and registration flows with validation and error handling
 * Complexity: 1 (simple state management and API calls)
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
  const loginMutation = useMutation({
    mutationFn: async (data: LoginPayload) => {
      // Backend expects OAuth2PasswordRequestForm (FormData)
      const formData = new FormData()
      formData.append('username', data.email) // Map email to username
      formData.append('password', data.password)

      const response = await apiClient.post('/auth/login', formData, {
        headers: {
          'Content-Type': 'multipart/form-data', // Required for OAuth2 form
        },
      })
      return response.data
    },
    onSuccess: (data) => {
      console.log('Login Successful:', data)
      if (data.access_token) {
        localStorage.setItem('access_token', data.access_token)
        // Dispatch event or callback to update auth context?
        // For now, simple reload or redirect logic would be handled by the consumer of this hook or global state
        window.location.href = '/' // Simple redirect for now
      }
    },
    onError: (error: unknown) => {
      console.error('Login Failed:', error)
      const msg =
        (error as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
        'Login failed. Please check your credentials.'
      setErrors({ root: msg })
    },
  })

  // Register Mutation
  const registerMutation = useMutation({
    mutationFn: async (data: RegisterPayload) => {
      // Backend expects UserCreate schema (JSON)
      const payload = {
        email: data.email,
        password: data.password,
        full_name: data.name, // Map name to full_name
      }

      const response = await apiClient.post('/users/', payload)
      return response.data
    },
    onSuccess: (data) => {
      console.log('Register Successful:', data)
      // Auto login after register? Or switch tab?
      // For now, let's switch to login tab and prefill
      setActiveTab('login')
      setEmail(newEmail)
      setPassword(newPassword)
      setErrors({})
      alert('Registration successful! Please login.')
    },
    onError: (error: unknown) => {
      console.error('Register Failed:', error)
      const msg =
        (error as { response?: { data?: { detail?: string } } }).response?.data?.detail ||
        'Registration failed.'
      setErrors({ root: msg })
    },
  })

  const handleLogin = () => {
    // Validate with Zod
    const result = LoginSchema.safeParse({ email, password })

    if (!result.success) {
      setErrors(formatZodErrors(result.error))
      return
    }

    setErrors({}) // Clear errors
    loginMutation.mutate({ email, password })
  }

  const handleRegister = () => {
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
    registerMutation.mutate({ name: newName, email: newEmail, password: newPassword })
  }

  return {
    activeTab,
    setActiveTab,
    loginData: { email, setEmail, password, setPassword },
    registerData: { newName, setNewName, newEmail, setNewEmail, newPassword, setNewPassword },
    errors,
    handleLogin,
    handleRegister,
    isLoading: loginMutation.isPending || registerMutation.isPending,
  }
}
