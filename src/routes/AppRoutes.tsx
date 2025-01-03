
import {  Routes, Route } from "react-router-dom";
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from "@/pages/Home";
import Sidebar from "@/components/Sidebar";

const AppRoutes = () => {
  return (
  
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sidebar" element={<Sidebar />} />
      
    </Routes>

  );
};

export default AppRoutes;
