import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import GameSetupPage from './pages/GameSetupPage';
import GamePlayPage from './pages/GamePlayPage';
import ResultPage from './pages/ResultPage';
// ... other imports

function App() {
  return (
    <Router>
      <div className="App">
        <nav>
          <ul>
            <li><Link to="/setup">Game Setup</Link></li>
            <li><Link to="/play">Game Play</Link></li>
          </ul>
        </nav>

        <Routes>
          <Route path="/setup" element={<GameSetupPage />} />
          <Route path="/play" element={<GamePlayPage />} />
          <Route path="/result" element={<ResultPage />} />
          <Route path="/" element={<GameSetupPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
