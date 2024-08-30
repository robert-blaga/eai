import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { setEffortPoints, setImpactPoints, setCurrentQuestionIndex } from '../redux/gameSlice';
import './GamePlayPage.css';

const GamePlayPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { questions, currentQuestionIndex, effortPoints, impactPoints } = useSelector(state => state.game);

  const handleNextQuestion = (selectedAction) => {
    if (selectedAction) {
      dispatch(setEffortPoints(Math.max(0, effortPoints - selectedAction.effort)));
      dispatch(setImpactPoints(impactPoints + selectedAction.impact));
    }

    if (currentQuestionIndex < questions.length - 1) {
      dispatch(setCurrentQuestionIndex(currentQuestionIndex + 1));
    } else {
      // Game over, navigate to ResultPage
      navigate('/result');
    }
  };

  return (
    <div className="game-play-page">
      <div className="left-column">
        <div className="trackers">
          <EffortMeter editable={false} />
          <ImpactMeter editable={false} />
          <TimeMeter editable={false} />
          <Rewards editable={false} />
        </div>
      </div>
      <div className="main-content">
        <h1>Game Play</h1>
        <div className="question-counter">
          Question {currentQuestionIndex + 1} of {questions.length}
        </div>
        <ActionList
          questionIndex={currentQuestionIndex}
          editable={false}
          onNextQuestion={handleNextQuestion}
        />
      </div>
    </div>
  );
};

export default GamePlayPage;
