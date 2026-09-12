import { apiClient } from './apiClient'
import type {
  AuthenticatedUser,
  ForgotPasswordPayload,
  LoginPayload,
  LoginResponse,
  MeResponse,
  MessageResponse,
  ResetPasswordPayload,
} from '../types/auth'

export const authApi = {
  async login(payload: LoginPayload): Promise<LoginResponse['data']> {
    const response = await apiClient.post<LoginResponse>('/auth/login', payload)
    return response.data.data
  },

  async logout(): Promise<void> {
    await apiClient.post('/auth/logout')
  },

  async getMe(): Promise<AuthenticatedUser> {
    const response = await apiClient.get<MeResponse>('/auth/me')
    return response.data.data
  },

  async forgotPassword(email: string): Promise<string> {
    const payload: ForgotPasswordPayload = { email }
    const response = await apiClient.post<MessageResponse>('/auth/forgot-password', payload)
    return response.data.message
  },

  async resetPassword(payload: ResetPasswordPayload): Promise<string> {
    const response = await apiClient.post<MessageResponse>('/auth/reset-password', payload)
    return response.data.message
  },
}
