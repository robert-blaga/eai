import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Typography, Button, Card, CardContent } from '@mui/material';
import { ListAlt, BarChart } from '@mui/icons-material';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { setCurrentQuestionIndex, updateGameState } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';
import './GamePlayPage.css';
import './Card.css';

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
    <div className="game-play-page">
      <div className="content-container">
        <Card className="custom-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="card-title">
              <BarChart fontSize="small" /> Stats
            </Typography>
            <div className="trackers">
              <EffortMeter editable={false} className="tracker" />
              <ImpactMeter editable={false} className="tracker" />
              <TimeMeter editable={false} className="tracker" />
              <Rewards editable={false} className="tracker" />
            </div>
          </CardContent>
        </Card>

        <Card className="custom-card">
          <CardContent>
            <Typography variant="h6" gutterBottom className="card-title">
              <ListAlt fontSize="small" /> Actions
            </Typography>
            <div className="main-content action-list-container">
              <ActionList
                questionIndex={gameState.currentQuestionIndex}
                editable={false}
                initialQuestion={currentQuestion}
                initialActions={currentQuestion.actions}
                selectedActionIndex={selectedActionIndex}
                setSelectedActionIndex={handleActionSelect}
              />
              <Button 
                variant="contained" 
                color="primary" 
                onClick={handleNextQuestion}
                disabled={selectedActionIndex === null}
                className="next-question-button"
              >
                {gameState.currentQuestionIndex < gameState.questions.length - 1 ? "Next Question" : "Finish Game"}
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default GamePlayPage;
