// Backwards-compatible service export. Authentication session state is
// managed by AuthContext, while password-reset requests use authApi.
export { authApi as authService } from '../api/authApi'
