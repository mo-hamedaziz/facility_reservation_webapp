import { useState } from 'react'
import {BrowserRouter as Router, Route, Routes, Link} from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import RequestList from './RequestList';
import RequestDetails from './RequestDetails';
import NotFound from './NotFound';
import Navbar from './Navbar';
import Footer from './Footer';
import PresidentDetails from './PresidentDetails';
import SignupRequestPresidentListSelector from './SignupRequestPresidentListSelector';
import PresidentRequests from './PresidentRequests'
import SignupRequestDetails from './SignupRequestDetails'

function App() {

  return (
    <Router>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>
        <div className="content">
          <Routes>
            <Route 
              path='/requests/list'
              element={<RequestList />}
            />
            <Route 
              path="/request/:id"
              element={<RequestDetails />}/>
            <Route 
              path="/users"
              element={<SignupRequestPresidentListSelector />}/>
            <Route 
              path="/account/president/:id"
              element={<PresidentDetails />}/>
            <Route 
              path="/requests/user/:id"
              element={<PresidentRequests />}/>
            <Route 
              path="/signups/requests/:id"
              element={<SignupRequestDetails />}/>
            <Route 
              path='*'
              element={ <NotFound /> }
            />
          </Routes>
        </div>
        <div className="footer">
          <Footer />
        </div>
      </div>
    </Router>
  )
}

export default App
