export interface Permission {
  id: number
  name: string
  module: string
  action: string
  description: string | null
  is_active: boolean
}

export interface AuthorizationRole {
  id: number
  name: string
  description: string | null
  is_active: boolean
  permissions_count?: number
  permissions?: Permission[]
  created_at?: string
  updated_at?: string
}

export type PermissionGroups = Record<string, Permission[]>

export interface CreateRolePayload {
  name: string
  description: string | null
  is_active: boolean
  permissions: number[]
}

interface ApiResponse<T> {
  success: true
  data: T
  message?: string
}

export type RolesResponse = ApiResponse<AuthorizationRole[]>
export type RoleResponse = ApiResponse<AuthorizationRole>
export type PermissionsResponse = ApiResponse<PermissionGroups>

export interface MessageOnlyResponse {
  success: true
  message: string
}
