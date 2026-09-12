import { apiClient } from './apiClient'
import type {
  AuthorizationRole,
  CreateRolePayload,
  MessageOnlyResponse,
  PermissionGroups,
  PermissionsResponse,
  RoleResponse,
  RolesResponse,
} from '../types/authorization'

export const authorizationApi = {
  async getRoles(): Promise<AuthorizationRole[]> {
    const response = await apiClient.get<RolesResponse>('/roles')
    return response.data.data
  },

  async getRole(id: number): Promise<AuthorizationRole> {
    const response = await apiClient.get<RoleResponse>(`/roles/${id}`)
    return response.data.data
  },

  async createRole(payload: CreateRolePayload): Promise<AuthorizationRole> {
    const response = await apiClient.post<RoleResponse>('/roles', payload)
    return response.data.data
  },

  async updateRolePermissions(id: number, permissions: number[]): Promise<AuthorizationRole> {
    const response = await apiClient.put<RoleResponse>(`/roles/${id}/permissions`, {
      permissions,
    })
    return response.data.data
  },

  async deleteRole(id: number): Promise<string> {
    const response = await apiClient.delete<MessageOnlyResponse>(`/roles/${id}`)
    return response.data.message
  },

  async getPermissions(): Promise<PermissionGroups> {
    const response = await apiClient.get<PermissionsResponse>('/permissions')
    return response.data.data
  },
}
