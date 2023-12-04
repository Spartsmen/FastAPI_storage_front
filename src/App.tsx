import RegisterPage from "./components/Registration"
import Header from "./components/Header"
import MainPage from "./components/Main";
import LoginPage from "./components/Login";
import DashBoard from "./components/Dashboard";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function App() {
  
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<MainPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App
