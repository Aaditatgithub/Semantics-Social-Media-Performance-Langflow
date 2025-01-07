import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import DashboardPage from './pages/DashboardPage';
import AuroraBackground from './components/AuroraBackground';

function App() {
  return (
    <Router>
      <AuroraBackground>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/dashboard" element={<DashboardPage />} />
        </Routes>
      </AuroraBackground>
    </Router>
  );
}

export default App;