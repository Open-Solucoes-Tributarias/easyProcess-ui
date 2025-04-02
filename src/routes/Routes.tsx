import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
import { ControlPanel } from "../pages/dashboard/controlPanel/ControlPanel";


export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
       <Route path="/painel" element={<ControlPanel/>}/>
       </Routes>
    </Router>
  );
};
