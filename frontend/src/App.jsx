import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatBot from "./components/ChatBot";

// ✅ Function to check if user is authenticated (simple example)
const isAuthenticated = () => {
  return !!localStorage.getItem("token"); // assumes JWT/token stored after login
};

// ✅ Protected Route Wrapper
const PrivateRoute = ({ children }) => {
  return isAuthenticated() ? children : <Navigate to="/" />;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route
          path="/chat"
          element={
            <PrivateRoute>
              <ChatBot />
            </PrivateRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
