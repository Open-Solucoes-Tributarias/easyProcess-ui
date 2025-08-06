import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { Dashboard } from "../pages/dashboard/Dashboard";
import { Painel } from "../pages/controlPanel/Painel";
import { LoginPage } from "../pages/login/Login";
import { PrivateRoute } from "./PrivateRoute";
import { RegisterPage } from "../pages/login/Registro";
import { DashboardLayout } from "../layouts/DashboardLayout";
import { Gerenciar } from "../pages/gerenciar/Gerenciar";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        {/* rota publica */}
        <Route path="/cadastro" element={<RegisterPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/" element={<LoginPage />} />
        {/* rotas privadas, checagem de permissão */}
        <Route element={<PrivateRoute />}>
          {/* layout visual do dashboard para rotas privadas */}
          <Route element={<DashboardLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/painel" element={<Painel />} />
            <Route path="/gerenciar" element={<Gerenciar />} />
          </Route>
        </Route>
        {/* Rota error */}
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};
