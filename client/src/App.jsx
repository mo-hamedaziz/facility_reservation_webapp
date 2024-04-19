import { BrowserRouter as Router, Route, Routes, Link } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

// imports for Aziz
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import PresidentDetails from './PresidentDetails';
import SignupRequestPresidentListSelector from './SignupRequestPresidentListSelector';
import SignupRequestDetails from './SignupRequestDetails'

// imports for Ines
import Login from "./Login";
import SignUp from "./SignUp";
import ProfilePage from "./ProfilePage";
import Home from "./Home";
import DashboardAdmin from "./DashboardAdmin";
import DashboardPresident from "./DashboardPresident";
import SignUpSuccess from "./SignUpSuccess";

//imports for louay
import DashPresident from './DashPresident'; 
import DashAdmin from './DashAdmin';

function App() {
  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            {/*Ines's routes*/}
            <Route path="/" element={<Home />} />
            <Route path="signup" element={<SignUp />} />
            <Route path="/login" element={<Login />} />
            <Route
              path="/dashboard/president"
              element={<DashboardPresident />}
            />
            <Route path="/dashboard/admin" element={<DashboardAdmin />} />
            <Route path="/accountdetails" element={<ProfilePage />} />
            <Route path="/signup-success" element={<SignUpSuccess />} />

            {/*Aziz's routes*/}
            <Route 
              path='/request/list'
              element={<RequestList />}
            />
            <Route 
              path="/request/details"
              element={<RequestDetails />}/>
            <Route 
              path="/users"
              element={<SignupRequestPresidentListSelector />}/>
            <Route 
              path="/users/president/details"
              element={<PresidentDetails />}/>
            <Route 
              path="/users/signup/request/details"
              element={<SignupRequestDetails />}/>

              {/*Louay's routes*/}
            <Route 
              path="/adminHome" 
              element={<DashAdmin />} />
            <Route
              path="/presidentHome" 
              element={<DashPresident />} />

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
