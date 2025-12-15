import { Routes, Route, Navigate } from "react-router-dom";
import AdminLogin from "./pages/AdminLogin";
import Dashboard from "./pages/Dashboard";
import ProductsList from "./pages/ProductsList";
import OrdersList from "./pages/OrdersList";
import ProductCreate from "./pages/ProductCreate";
import ProductEdit from "./pages/ProductEdit";
import PrivateAdminRoute from "./components/PrivateAdminRoute";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/admin-login" />} />

      <Route path="/admin-login" element={<AdminLogin />} />

      <Route
        path="/dashboard"
        element={
          <PrivateAdminRoute>
            <Dashboard />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="/products"
        element={
          <PrivateAdminRoute>
            <ProductsList />
          </PrivateAdminRoute>
        }
      />

      <Route
        path="/products/new"
        element={
          <PrivateAdminRoute>
            <ProductCreate />
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

      <Route
        path="/orders"
        element={
          <PrivateAdminRoute>
            <OrdersList />
          </PrivateAdminRoute>
        }
      />
    </Routes>
  );
}

export default App;
