import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { setCurrentQuestionIndex, updateGameState } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';

const GamePlayPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameState = useSelector(state => state.game);
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  const handleActionSelect = (index) => {
    setSelectedActionIndex(index);
  };

  const handleNextQuestion = () => {
    if (selectedActionIndex !== null) {
      const selectedAction = gameState.questions[gameState.currentQuestionIndex].actions[selectedActionIndex];
      
      // Update game state
      dispatch(updateGameState({
        effortPoints: gameState.effortPoints - selectedAction.effort,
        impactPoints: gameState.impactPoints + selectedAction.impact,
        currentYear: gameState.currentYear + 1,
      }));

      if (gameState.currentQuestionIndex < gameState.questions.length - 1) {
        dispatch(setCurrentQuestionIndex(gameState.currentQuestionIndex + 1));
        setSelectedActionIndex(null);
      } else {
        navigate('/result');
      }
    } else {
      alert("Please select an action before proceeding.");
    }
  };

  const currentQuestion = gameState.questions[gameState.currentQuestionIndex];

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" gutterBottom>{gameState.name || 'Game Play'}</Typography>
      {gameState.description && (
        <Typography variant="body1" gutterBottom>{gameState.description}</Typography>
      )}
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <EffortMeter />
        <ImpactMeter />
        <TimeMeter />
        <Rewards />
      </Box>
      <Box sx={{ flexGrow: 1 }}>
        <ActionList
          questionIndex={gameState.currentQuestionIndex}
          editable={false}
          initialQuestion={currentQuestion.question}
          initialActions={currentQuestion.actions}
          selectedActionIndex={selectedActionIndex}
          setSelectedActionIndex={handleActionSelect}
        />
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleNextQuestion}
          disabled={selectedActionIndex === null}
          sx={{ mt: 2 }}
        >
          {gameState.currentQuestionIndex < gameState.questions.length - 1 ? "Next Question" : "Finish Game"}
        </Button>
      </Box>
    </Box>
  );
};

export default GamePlayPage;
