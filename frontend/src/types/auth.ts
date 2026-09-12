export interface Role {
  id: number
  name: string
}

export interface Branch {
  id: number
  name: string
  code?: string
}

export interface AuthenticatedUser {
  id: number
  name: string
  email: string
  phone: string | null
  is_active: boolean
  role: Role | null
  branch: Branch | null
  permissions: string[]
}

export interface LoginPayload {
  email: string
  password: string
}

export interface LoginResponse {
  success: true
  message: string
  data: {
    token: string
    token_type: 'Bearer'
    user: AuthenticatedUser
  }
}

export interface MeResponse {
  success: true
  data: AuthenticatedUser
}

export interface ForgotPasswordPayload {
  email: string
}

export interface ResetPasswordPayload {
  email: string
  token: string
  password: string
  password_confirmation: string
}

export interface MessageResponse {
  success: true
  message: string
}

export interface ApiErrorResponse {
  success?: false
  message?: string
  errors?: Record<string, string[]>
}

export interface AuthContextType {
  user: AuthenticatedUser | null
  token: string | null
  isAuthenticated: boolean
  isLoading: boolean
  login: (payload: LoginPayload) => Promise<void>
  logout: () => Promise<void>
  refreshUser: () => Promise<void>
}
