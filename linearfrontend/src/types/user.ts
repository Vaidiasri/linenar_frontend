/**
 * User model representing authenticated user data
 */
export interface User {
  id: string
  full_name: string
  email: string
  avatar_url?: string
  role: string
  team_id?: string
}

export interface LoginResponse {
  access_token: string
  token_type: string
}

export interface RegisterResponse {
  access_token: string
  token_type: string
}
