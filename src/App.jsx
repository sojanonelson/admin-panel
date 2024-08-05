import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import AdminLayout from "./components/Layout/AdminLayout.jsx";
import StudentAccount from "./Pages/StudentAccount.jsx.jsx";

const App = () => {
  return (
    <div>
      <div className="text-center bg-slate-300  p-2  font-bold text-2xl">
        <Link  to='/'>ADMIN PANEL🛠 (Test mode)</Link>
      </div>
      <Routes>
        <Route path="/" element={<AdminLayout />}/>

          <Route path="/admin" element={<AdminLayout />} />
          <Route path="/student" element={<StudentAccount />} />
        
      </Routes>
    </div>
  );
};

export default App;
