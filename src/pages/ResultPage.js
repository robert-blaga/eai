import React from 'react';
import { useSelector } from 'react-redux';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import './ResultPage.css';

const ResultPage = () => {
  const { effortPoints, impactPoints, currentYear, rewardsCount } = useSelector(state => state.game);

  return (
    <div className="result-page">
      <h1>Your Final Results</h1>
      <div className="trackers-container">
        <EffortMeter editable={false} />
        <ImpactMeter editable={false} />
        <TimeMeter editable={false} />
        <Rewards editable={false} />
      </div>
      <div className="summary">
        <h2>Summary</h2>
        <p>Effort Points Remaining: {effortPoints}</p>
        <p>Impact Points Achieved: {impactPoints}</p>
        <p>Year Reached: {currentYear}</p>
        <p>Rewards Earned: {rewardsCount}</p>
      </div>
    </div>
  );
};

export default ResultPage;
