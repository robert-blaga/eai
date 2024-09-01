import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, TextField, Card, CardContent } from '@mui/material';
import { Settings, BarChart, ListAlt } from '@mui/icons-material'; // Import the icons
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { addQuestion, saveGame, resetGame } from '../redux/gameSlice';
import './GameSetupPage.css';
import './Card.css'; // Import the new CSS file for cards

const GameSetupPage = () => {
  const dispatch = useDispatch();
  const gameState = useSelector(state => state.game);
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleSaveGame = () => {
    if (gameName) {
      dispatch(saveGame({ name: gameName, description: gameDescription, state: gameState }));
      alert("Game saved successfully!");
      dispatch(resetGame());
      setGameName('');
      setGameDescription('');
    } else {
      alert("Please enter a name for your game.");
    }
  };

  return (
    <div className="game-setup-page">
      <div className="header-container">
        <Button variant="contained" color="secondary" onClick={handleSaveGame} className="save-game-button">
          Save Game
        </Button>
      </div>
      <div className="content-container">
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="card-title">
              <Settings fontSize="small" /> General
            </Typography>
            <TextField
              label="Game Name"
              value={gameName}
              onChange={(e) => setGameName(e.target.value)}
              fullWidth
              InputProps={{ className: 'custom-input game-name-input' }} // Updated class name
              sx={{ mb: 2 }}
            />
            <TextField
              label="Game Description"
              value={gameDescription}
              onChange={(e) => setGameDescription(e.target.value)}
              multiline
              rows={2} // Set default rows to 2
              fullWidth
              InputProps={{ className: 'custom-input game-description-input' }} // Updated class name
              sx={{ mb: 2 }}
            />
          </CardContent>
        </Card>
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="card-title">
              <BarChart fontSize="small" /> Stats
            </Typography>
            <div className="trackers">
              <EffortMeter editable={true} className="tracker-1" />
              <ImpactMeter editable={true} className="tracker-2" />
              <TimeMeter editable={true} className="tracker-3" />
              <Rewards editable={true} className="tracker-4" />
            </div>
          </CardContent>
        </Card>
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="card-title">
              <ListAlt fontSize="small" /> Actions
            </Typography>
            <div className="main-content action-list-container">
              {gameState.questions.map((questionData, index) => (
                <ActionList
                  key={index}
                  questionIndex={index}
                  editable={true}
                  initialQuestion={questionData}
                  initialActions={questionData.actions}
                />
              ))}
              <Button variant="contained" color="primary" onClick={handleAddQuestion} className="add-question-button">
                Add New Question
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default GameSetupPage;
