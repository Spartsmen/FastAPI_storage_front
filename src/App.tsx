import RegisterPage from "./components/Registration"
import Header from "./pages/Header"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./components/Login";
function App() {
  
  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      </Router>
    </div>
  );
  
}

export default App
