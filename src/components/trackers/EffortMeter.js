import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEffortName, setEffortPoints, setPointsName } from '../../redux/gameSlice';
import './Trackers.css';


const EffortMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { effortName, effortPoints, pointsName } = useSelector(state => state.game);

  const nameRef = useRef(null);
  const pointsRef = useRef(null);
  const pointsNameRef = useRef(null);

  const handleBlur = (field, ref) => {
    const value = ref.current.textContent;
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
  };

  const renderEditable = (field, value, ref) => {
    return (
      <span
        ref={ref}
        contentEditable={editable}
        onBlur={() => handleBlur(field, ref)}
        suppressContentEditableWarning={true}
        className="editable-content"
      >
        {value}
      </span>
    );
  };

  const maxEffort = 100;
  const filledWidth = (effortPoints / maxEffort) * 100;

  return (
    <div className="tracker effort-meter">
      <div className="tracker-content">
        <span className="tracker-label">
          {renderEditable('name', effortName, nameRef)}
        </span>
        <span className="tracker-value">
          {renderEditable('points', effortPoints, pointsRef)} {renderEditable('pointsName', pointsName, pointsNameRef)}
        </span>
      </div>
      <div className="tracker-bar effort-bar">
        <div className="tracker-bar-filled effort-bar-filled" style={{ width: `${filledWidth}%` }}></div>
      </div>
    </div>
  );
};

export default EffortMeter;
