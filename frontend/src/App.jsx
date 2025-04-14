import React from 'react';
import './App.css';
import Login from './component/Login';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Signup from './component/Signup';
import Home from './Pages/Home';

function App() {

  return (
    <div className="work">
        <Router>
          <Routes>
            <Route path="/" element= {<Navigate to="/login"/>} />
            <Route path="/login" element={<Login />} />
            <Route path="/signup"element={<Signup/>}/>
         
          <Route path="/home" element={<Home />} />
          </Routes>
        </Router>
    </div>
  );
}

export default App;