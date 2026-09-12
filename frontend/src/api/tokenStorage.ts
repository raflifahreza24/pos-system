const TOKEN_KEY = 'pos_access_token'

export function getToken(): string | null {
  return window.localStorage.getItem(TOKEN_KEY)
}

export function setToken(token: string): void {
  window.localStorage.setItem(TOKEN_KEY, token)
}

export function removeToken(): void {
  window.localStorage.removeItem(TOKEN_KEY)
}
