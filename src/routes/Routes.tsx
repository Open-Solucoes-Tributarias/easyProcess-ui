// src/routes/index.tsx
// import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { DashboardPage } from "../pages/dashboard/DashboardPage";
// import Home from "../pages/Home";
// import About from "../pages/About";

export const AppRoutes = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        {/* <Route path="/about" element={<p>página 2</p>} /> */}
      </Routes>
    </Router>
  );
};
