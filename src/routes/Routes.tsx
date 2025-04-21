import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ControlPanel } from "../pages/controlPanel/ControlPanel";
import { LoginPage } from "../pages/login/LoginPage";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
       <Route path="/painel" element={<ControlPanel/>}/>
       <Route path="/login" element={<LoginPage/>}/>
       <Route path="/dashboard" element={<DashboardPage/>}/>
       </Routes>
    </Router>
  );
};
