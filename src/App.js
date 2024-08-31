import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import NavMenu from './components/NavMenu';
import LandingPage from './pages/LandingPage';
import GameSetupPage from './pages/GameSetupPage';
import GamePlayPage from './pages/GamePlayPage';
import ResultPage from './pages/ResultPage';
import Dashboard from './components/Dashboard';
import LibraryPage from './pages/LibraryPage';
import './App.css';

function App() {
  return (
    <Router>
      <Box sx={{ display: 'flex' }}>
        <NavMenu />
        <Box component="main" sx={{ flexGrow: 1, p: 3, marginLeft: '280px' }}>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/setup" element={<GameSetupPage />} />
            <Route path="/play" element={<GamePlayPage />} />
            <Route path="/result" element={<ResultPage />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/library" element={<LibraryPage />} />
          </Routes>
        </Box>
      </Box>
    </Router>
  );
}

export default App;
