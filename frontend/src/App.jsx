import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import ChatBot from "./components/ChatBot";

const isAuthenticated = () => {
  return !!localStorage.getItem("token"); 
};

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
