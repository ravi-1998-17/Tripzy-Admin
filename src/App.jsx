import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import Dashboard from "./pages/Dashboard";

function App() {

  return (
    <>
    <Routes>
      <Route path="/admin-login" element={<AdminLogin />}/>
      <Route path="dashboard" element={<PrivateAdminRoute>
        <Dashboard />
      </PrivateAdminRoute> }/>
    </Routes>
      
    </>
  );
}

export default App;
