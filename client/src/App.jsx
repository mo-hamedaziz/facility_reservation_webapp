import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import RequestList from "./RequestList";
import RequestDetails from "./RequestDetails";
import NotFound from "./NotFound";
import Navbar from "./Navbar";
import Footer from "./Footer";
import PresidentDetails from "./PresidentDetails";
import SignupRequestPresidentListSelector from "./SignupRequestPresidentListSelector";
import PresidentRequests from "./PresidentRequests";
import SignupRequestDetails from "./SignupRequestDetails";
import Login from "./Login";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import Dashboard from "./Dashboard";

function App() {
  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route path="/request/list" element={<RequestList />} />
            <Route path="/request/details" element={<RequestDetails />} />
            <Route
              path="/users"
              element={<SignupRequestPresidentListSelector />}
            />
            <Route
              path="/users/president/details"
              element={<PresidentDetails />}
            />
            <Route
              path="/users/signup/request/details"
              element={<SignupRequestDetails />}
            />
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/president"
              element={<Dashboard userType={"president"} />}
            />
            <Route
              path="/dashboard/admin"
              element={<Dashboard userType={"admin"} />}
            />
            <Route path="AccountDetails" element={<ProfilePage />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  );
}

export default App;
