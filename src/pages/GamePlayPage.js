import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Button } from '@mui/material';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { setCurrentQuestionIndex, updateGameState, updateRewardProgress, checkAndAwardRewards, resetGameProgress } from '../redux/gameSlice';
import { useNavigate } from 'react-router-dom';

const GamePlayPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameState = useSelector(state => state.game);
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  useEffect(() => {
    dispatch(resetGameProgress());
  }, [dispatch]);

  const handleActionSelect = (actionIndex) => {
    setSelectedActionIndex(actionIndex);
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

      // Update reward progress
      if (selectedAction.reward) {
        dispatch(updateRewardProgress({ rewardName: selectedAction.reward }));
      }

      // Check and award rewards
      dispatch(checkAndAwardRewards());

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

  return (
    <div className="game-play-page">
      <div className="content-container">
        <div className="sidebar">
          <div className="section">
            <h2>Trackers</h2>
            <div className="trackers">
              <EffortMeter editable={false} />
              <ImpactMeter editable={false} />
              <TimeMeter editable={false} />
              <Rewards editable={false} />
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="section">
            <h2>Questions</h2>
            <div className="questions-container">
              <ActionList 
                questionIndex={gameState.currentQuestionIndex} 
                editable={false} 
                initialQuestion={gameState.questions[gameState.currentQuestionIndex]} 
                initialActions={gameState.questions[gameState.currentQuestionIndex].actions}
                onActionSelect={handleActionSelect}
                selectedActionIndex={selectedActionIndex}
                showReward={true}
              />
            </div>
            <Button onClick={handleNextQuestion} className="add-question-button" disabled={selectedActionIndex === null}>
              Next Question
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GamePlayPage;
