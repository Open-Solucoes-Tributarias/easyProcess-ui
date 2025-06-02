import { jwtDecode } from "jwt-decode";

// Verifica validade do token de autenticação
export function isTokenValid() {
  const token = localStorage.getItem('token');
  if (!token) return false;

  try {
    const decoded = jwtDecode(token);
    const now = Date.now() / 1000;
    return decoded.exp > now;
  } catch {
    return false;
  }
}
