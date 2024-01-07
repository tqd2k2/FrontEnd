import React from "react";
import { BrowserRouter as Router, Routes, Route} from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import HomePage from "./pages/HomePage";
import QRPage from "./pages/QRPage";
import AdminPage from "./pages/AdminPage";

const App = () => {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<HomePage/>}/>
      <Route path='/login' element={<LoginPage/>}/>
      <Route path='/register' element={<RegisterPage/>}/>
      <Route path='/qr' element={<QRPage/>}/>
      <Route path="/admin" element={<AdminPage/>}/>
    </Routes>
    </Router>
  );
};

export default App;