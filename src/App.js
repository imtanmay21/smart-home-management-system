import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Dashboard } from "./pages/Dashboard";
import { Signup } from "./pages/Signup";
import { Login } from "./pages/Login";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Dashboard/>} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
};

export default App;
