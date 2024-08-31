import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField } from '@mui/material';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { addQuestion, saveGame, resetGame } from '../redux/gameSlice';

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
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" gutterBottom>Game Setup</Typography>
      <TextField
        label="Game Name"
        value={gameName}
        onChange={(e) => setGameName(e.target.value)}
        sx={{ mb: 2 }}
      />
      <TextField
        label="Game Description"
        value={gameDescription}
        onChange={(e) => setGameDescription(e.target.value)}
        multiline
        rows={3}
        sx={{ mb: 2 }}
      />
      <Box sx={{ display: 'flex', gap: 3 }}>
        <Box sx={{ width: 250 }}>
          <EffortMeter editable={true} />
          <ImpactMeter editable={true} />
          <TimeMeter editable={true} />
          <Rewards editable={true} />
        </Box>
        <Box sx={{ flexGrow: 1 }}>
          {gameState.questions.map((questionData, index) => (
            <ActionList
              key={index}
              questionIndex={index}
              editable={true}
              initialQuestion={questionData.question}
              initialActions={questionData.actions}
            />
          ))}
          <Button variant="contained" color="primary" onClick={handleAddQuestion} sx={{ mt: 2, mr: 2 }}>
            Add New Question
          </Button>
          <Button variant="contained" color="secondary" onClick={handleSaveGame} sx={{ mt: 2 }}>
            Save Game
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default GameSetupPage;
