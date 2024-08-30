import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { addQuestion } from '../redux/gameSlice';
import './GameSetupPage.css';

const GameSetupPage = () => {
  const dispatch = useDispatch();
  const questions = useSelector(state => state.game.questions);

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  return (
    <div className="game-setup-page">
      <div className="left-column">
        <div className="trackers">
          <EffortMeter editable={true} />
          <ImpactMeter editable={true} />
          <TimeMeter editable={true} />
          <Rewards editable={true} />
        </div>
      </div>
      <div className="main-content">
        <h1>Game Setup</h1>
        {questions.map((questionData, index) => (
          <ActionList
            key={index}
            questionIndex={index}
            editable={true}
            initialQuestion={questionData.question}
            initialActions={questionData.actions}
          />
        ))}
        <button className="add-question-button" onClick={handleAddQuestion}>Add New Question</button>
      </div>
    </div>
  );
};

export default GameSetupPage;
