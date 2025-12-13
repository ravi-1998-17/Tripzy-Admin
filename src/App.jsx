import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import PrivateAdminRoute from "./components/PrivateAdminRoute";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import ProductEdit from "./pages/ProductEdit";

function App() {
  return (
    <>
      <Routes>
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route
          path="dashboard"
          element={
            <PrivateAdminRoute>
              <Dashboard />
            </PrivateAdminRoute>
          }
        />
      </Routes>

      <Route
        path="products"
        element={
          <PrivateAdminRoute>
            <ProductsList />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="/products/edit/:id"
        element={
          <PrivateAdminRoute>
            <ProductEdit />
          </PrivateAdminRoute>
        }
      />
    </>
  );
}

export default App;
