import { jwtDecode } from "jwt-decode"
//verifica validade do token de authenticação
export function isTokenValid(): boolean {
  const token = localStorage.getItem('token')
  if (!token) return false

  try {
    const decoded: any = jwtDecode(token)
    const now = Date.now() / 1000
    return decoded.exp > now
  } catch {
    return false
  }
}