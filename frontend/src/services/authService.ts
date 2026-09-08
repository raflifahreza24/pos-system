// Business logic for the auth screens (Login, Reset Password). Currently
// dummy handlers with a simulated delay (no backend exists yet) — swap
// each method's body for the matching apiClient call once the real
// endpoint exists. Pages only ever call this service, never the API
// directly, so that's the only file that needs to change (mirrors
// src/services/dashboardService.ts).

export interface LoginCredentials {
  emailOrUsername: string
  password: string
  rememberMe: boolean
}

export interface LoginResult {
  token: string
  name: string
}

export interface ResetPasswordPayload {
  password: string
  // TODO: also accept a reset token once the real "forgot password" email
  // flow exists — this dummy version resets unconditionally.
}

export interface ResetPasswordResult {
  success: boolean
}

function delay<T>(value: T, ms = 700): Promise<T> {
  return new Promise((resolve) => setTimeout(() => resolve(value), ms))
}

export const authService = {
  login: (credentials: LoginCredentials): Promise<LoginResult> => {
    // TODO: replace with a real request once the backend endpoint exists,
    // e.g. `apiClient.post<LoginResult>('/auth/login', credentials)`.
    return delay({ token: 'dummy-token', name: credentials.emailOrUsername || 'Super Admin' })
  },

  resetPassword: (payload: ResetPasswordPayload): Promise<ResetPasswordResult> => {
    // TODO: replace with a real request once the backend endpoint exists,
    // e.g. `apiClient.post<ResetPasswordResult>('/auth/reset-password', payload)`.
    void payload
    return delay({ success: true })
  },
}
