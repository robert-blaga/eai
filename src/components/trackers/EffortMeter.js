import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEffortName, setEffortPoints, setPointsName, addEffortSubsection, updateEffortSubsection, removeEffortSubsection } from '../../redux/gameSlice';
import './Trackers.css';

const EffortMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { effortName, effortPoints, pointsName, effortSubsections } = useSelector(state => state.game);

  const handleChange = (index, field, value) => {
    if (index === -1) {
      switch (field) {
        case 'name':
          dispatch(setEffortName(value));
          break;
        case 'points':
          dispatch(setEffortPoints(Number(value)));
          break;
        case 'pointsName':
          dispatch(setPointsName(value));
          break;
        default:
          break;
      }
    } else {
      dispatch(updateEffortSubsection({ index, field, value: field === 'points' ? Number(value) : value }));
    }
  };

  const renderTracker = (name, points, pointsName, index = -1) => {
    const maxEffort = 100;
    const filledWidth = (points / maxEffort) * 100;

    return (
      <div className={`tracker effort-meter ${index !== -1 ? 'subsection' : ''}`} key={index}>
        <div className="tracker-content">
          <span className="tracker-label">
            <input
              type="text"
              value={name}
              onChange={(e) => handleChange(index, 'name', e.target.value)}
              readOnly={!editable}
              className="editable-input"
            />
          </span>
          <span className="tracker-value">
            <input
              type="number"
              value={points}
              onChange={(e) => handleChange(index, 'points', e.target.value)}
              readOnly={!editable}
              className="editable-input"
            />
            <input
              type="text"
              value={pointsName}
              onChange={(e) => handleChange(index, 'pointsName', e.target.value)}
              readOnly={!editable}
              className="editable-input"
            />
          </span>
          {editable && index !== -1 && (
            <button onClick={() => dispatch(removeEffortSubsection(index))} className="remove-subsection">-</button>
          )}
        </div>
        <div className="tracker-bar effort-bar">
          <div className="tracker-bar-filled effort-bar-filled" style={{ width: `${filledWidth}%` }}></div>
        </div>
      </div>
    );
  };

  const handleAddSubsection = () => {
    dispatch(addEffortSubsection());
  };

  return (
    <div className="effort-meter-container">
      {renderTracker(effortName, effortPoints, pointsName)}
      {effortSubsections.map((subsection, index) => 
        renderTracker(subsection.name, subsection.points, subsection.pointsName, index)
      )}
      {editable && (
        <button onClick={handleAddSubsection} className="add-subsection">+</button>
      )}
    </div>
  );
};

export default EffortMeter;
