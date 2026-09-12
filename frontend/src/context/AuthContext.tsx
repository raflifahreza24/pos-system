import {
  useCallback,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import { authApi } from '../api/authApi'
import { getToken, removeToken, setToken } from '../api/tokenStorage'
import type { AuthenticatedUser, AuthContextType, LoginPayload } from '../types/auth'
import { AuthContext } from './AuthContextValue'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [token, setTokenState] = useState<string | null>(getToken)
  const [user, setUser] = useState<AuthenticatedUser | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  const clearSession = useCallback(() => {
    removeToken()
    setTokenState(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    setIsLoading(true)
    const persistedToken = getToken()

    if (!persistedToken) {
      clearSession()
      setIsLoading(false)
      return
    }

    try {
      const authenticatedUser = await authApi.getMe()
      setTokenState(persistedToken)
      setUser(authenticatedUser)
    } catch {
      clearSession()
    } finally {
      setIsLoading(false)
    }
  }, [clearSession])

  useEffect(() => {
    const restoreTimer = window.setTimeout(() => {
      void refreshUser()
    }, 0)

    return () => window.clearTimeout(restoreTimer)
  }, [refreshUser])

  const login = useCallback(async (payload: LoginPayload) => {
    const data = await authApi.login(payload)
    setToken(data.token)
    setTokenState(data.token)
    setUser(data.user)
  }, [])

  const logout = useCallback(async () => {
    try {
      await authApi.logout()
    } finally {
      clearSession()
      window.location.hash = '#/login'
    }
  }, [clearSession])

  const value = useMemo<AuthContextType>(
    () => ({
      user,
      token,
      isAuthenticated: user !== null,
      isLoading,
      login,
      logout,
      refreshUser,
    }),
    [user, token, isLoading, login, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
