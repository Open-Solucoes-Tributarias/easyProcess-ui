import { Navigate, Outlet } from "react-router-dom";
import { isTokenValid } from "../utils/auth";

export const PrivateRoute = () => {
    const isAuth = isTokenValid()
  
    if (!isAuth) {
      localStorage.removeItem('token')
      return <Navigate to="/login" replace />
    }
  
    return <Outlet />
  }