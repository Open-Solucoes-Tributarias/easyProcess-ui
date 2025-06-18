import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const PrivateRoute = () => {
    const isAuth = isTokenValid()
  
    if (!isAuth) { //remover em produção
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      return <Navigate to="/login" replace />
    }
  
    return <Outlet />
  }