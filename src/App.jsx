// Single screen with a simple toggle between Login and Register
import "./styles.module.css";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Layout from "../src/components/Layout";
import ResetPassword from "./components/ResetPassword";
import ForgetPassword from "./pages/ForgetPassword";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { ProductList } from "./components/ProductList";
import CategoriesList from "./components/CategoriesList";
import ProductPage from "./pages/ProductPage";

// import { useNavigate } from 'react-router-dom';

export default function App() {
  return (
    <>
      <BrowserRouter>
        <div>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="/login" element={<Login />} />
            <Route path="/layout/product-list" element={<ProductList />} />
            <Route path="/layout/category-list" element={<CategoriesList />} />
            <Route path="/layout/product-page" element={<ProductPage />} />
            {/* once tested then add the Product page to the protected routes  */}
            {/* for now these 2 routes are not in protected for testing purposes but they need to be protected routes */}

            {/* Protected Routes */}
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            ></Route>
            <Route
              path="/layout"
              element={
                <ProtectedRoute>
                  <Layout />
                </ProtectedRoute>
              }
            />

            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            ></Route>
            <Route path="/forget-pwd" element={<ForgetPassword />}></Route>
            <Route path="/reset-pwd" element={<ResetPassword />}></Route>
          </Routes>
        </div>
      </BrowserRouter>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
