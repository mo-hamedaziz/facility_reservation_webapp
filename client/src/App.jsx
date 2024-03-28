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

function App() {

  return (
    <Router>
      <>
        <Navbar />
        <div className="content">
          <Routes>
            <Route 
              path='/requests'
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
              path='*'
              element={ <NotFound /> }
            />
          </Routes>
        </div>
        <Footer />
      </>
    </Router>
  )
}

export default App
