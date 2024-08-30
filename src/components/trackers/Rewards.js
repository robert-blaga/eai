import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRewardsCount, setRewardsTotal } from '../../redux/gameSlice';
import './Trackers.css';

const Rewards = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { rewardsCount, rewardsTotal } = useSelector(state => state.game);

  const handleCountChange = (e) => {
    if (editable) {
      dispatch(setRewardsCount(Number(e.target.value)));
    }
  };

  const handleTotalChange = (e) => {
    if (editable) {
      dispatch(setRewardsTotal(Number(e.target.value)));
    }
  };

  return (
    <div className="tracker rewards">
      <div className="rewards-icon">🏆</div>
      <div className="rewards-count">
        <input 
          type="number" 
          value={rewardsCount} 
          onChange={handleCountChange}
          readOnly={!editable}
        />
        /
        <input 
          type="number" 
          value={rewardsTotal} 
          onChange={handleTotalChange}
          readOnly={!editable}
        />
      </div>
    </div>
  );
};

export default Rewards;
