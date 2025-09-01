import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';
import AdminPage from './components/AdminPage';
import ParticipantPage from './components/ParticipantPage';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/admin" element={<AdminPage />} />
          <Route path="/" element={<ParticipantPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App; 