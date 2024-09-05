import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Box } from '@mui/material';
import NavMenu from './components/NavMenu';
import LandingPage from './pages/LandingPage';
import GameSetupPage from './pages/GameSetupPage';
import GamePlayPage from './pages/GamePlayPage';
import ResultPage from './pages/ResultPage';
import Dashboard from './components/Dashboard';
import LibraryPage from './pages/LibraryPage';
import './styles/main.css';
import { db } from './firebase';
import { collection, addDoc, getDocs } from 'firebase/firestore';

function App() {
  useEffect(() => {
    const fetchMessage = async () => {
      const querySnapshot = await getDocs(collection(db, "messages"));
      if (querySnapshot.empty) {
        await addDoc(collection(db, "messages"), {
          text: "Hello from Firebase!"
        });
      }
    };

    fetchMessage();
  }, []);
  
  return (
    <Router>
      <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
        <NavMenu />
        <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 1, paddingTop: '40px' }}>
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