import axios, { AxiosError } from 'axios'
import { getToken } from './tokenStorage'
import type { ApiErrorResponse } from '../types/auth'

export const apiClient = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

apiClient.interceptors.request.use((config) => {
  const token = getToken()

  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }

  return config
})

const FALLBACK_ERROR_MESSAGE = 'Something went wrong. Please try again.'

export function getApiErrorMessage(
  error: unknown,
  fallback = FALLBACK_ERROR_MESSAGE,
): string {
  if (!(error instanceof AxiosError)) return fallback

  const status = error.response?.status
  const data = error.response?.data as ApiErrorResponse | undefined

  // Never surface raw server exception details for server-side failures.
  if (!status || status >= 500) return fallback

  if (status === 422 && data?.errors) {
    const firstValidationMessage = Object.values(data.errors).flat()[0]
    if (firstValidationMessage) return firstValidationMessage
  }

  return data?.message || fallback
}
