import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ControlPanel } from "../pages/controlPanel/ControlPanel";
import { LoginPage } from "../pages/login/LoginPage";
import { PrivateRoute } from "./PrivateRoute";
import { RegisterPage } from "../pages/login/RegisterPage";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* rota publica */}
        <Route path="/cadastro" element={<RegisterPage/>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* rotas privadas */}
        <Route element={<PrivateRoute />}>
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/painel" element={<ControlPanel />} />
        </Route>
        {/* Rota error */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
