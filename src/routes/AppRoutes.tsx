
import {  Routes, Route } from "react-router-dom";
import Login from '@/pages/Login';
import Signup from '@/pages/Signup';
import ForgotPassword from '@/pages/ForgotPassword';
import Home from "@/pages/Home";
import Sidebar from "@/components/Sidebar";
import StuSide from "@/student/Sidebar";
// import Store from "@/student/store/Store";
// import Sident from "@/student/Home"
// import Home1 from '@/student/Home'
// import { Dashboard } from "@/student/Dashboard ";

const AppRoutes = () => {
  return (
  
    <Routes>
      <Route path="/"  element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route path="/sidebar" element={<Sidebar />} />
      




      {/* Student Routes  */} 


      <Route path='/student' element={<StuSide/>} />
      {/* <Route path="/" element={<Store />} /> */}
      {/* <Route path='/home' element={<Dashboard/>} /> */}
      {/* <Route path="/home" element={<Home1 />} /> */}
      {/* <Route path="/home" element={<Home1 />} /> */}
      {/* <Route path='/student-dashboard' element={<Sident/>} /> */}
      
    </Routes>

  );
};

export default AppRoutes;
