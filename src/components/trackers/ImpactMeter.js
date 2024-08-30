import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setImpactName, setImpactPoints, setImpactPointsName } from '../../redux/gameSlice';
import './Trackers.css';

const ImpactMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { impactName, impactPoints, impactPointsName } = useSelector(state => state.game);
  const nameRef = useRef(null);
  const pointsRef = useRef(null);
  const pointsNameRef = useRef(null);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        dispatch(setImpactName(nameRef.current.textContent));
        break;
      case 'points':
        dispatch(setImpactPoints(Number(pointsRef.current.textContent)));
        break;
      case 'pointsName':
        dispatch(setImpactPointsName(pointsNameRef.current.textContent));
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
        onBlur={() => handleBlur(field)}
        suppressContentEditableWarning={true}
        className="editable-content"
      >
        {value}
      </span>
    );
  };

  const maxImpact = 100;
  const filledWidth = (impactPoints / maxImpact) * 100;

  return (
    <div className="tracker impact-meter">
      <div className="tracker-content">
        <span className="tracker-label">
          {renderEditable('name', impactName, nameRef)}
        </span>
        <span className="tracker-value">
          {renderEditable('points', impactPoints, pointsRef)} {renderEditable('pointsName', impactPointsName, pointsNameRef)}
        </span>
      </div>
      <div className="tracker-bar impact-bar">
        <div className="tracker-bar-filled impact-bar-filled" style={{ width: `${filledWidth}%` }}></div>
      </div>
    </div>
  );
};

export default ImpactMeter;
