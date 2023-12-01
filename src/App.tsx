import RegisterPage from "./components/Registration"
import Header from "./pages/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
import DashBoard from "./components/Dashboard";
function App() {
  
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/dashboard" element={<DashBoard/>} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App
