import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeName, setCurrentYear, setEndYear } from '../../redux/gameSlice';
import './Trackers.css';

const TimeMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { timeName, currentYear, startYear, endYear } = useSelector(state => state.game);
  const nameRef = useRef(null);
  const currentYearRef = useRef(null);
  const endYearRef = useRef(null);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        dispatch(setTimeName(nameRef.current.textContent));
        break;
      case 'currentYear':
        dispatch(setCurrentYear(Number(currentYearRef.current.textContent)));
        break;
      case 'endYear':
        dispatch(setEndYear(Number(endYearRef.current.textContent)));
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

  const totalYears = endYear - startYear;
  const progress = (currentYear - startYear) / totalYears;
  const filledWidth = progress * 100;

  return (
    <div className="tracker time-meter">
      <div className="tracker-content">
        <span className="tracker-label">
          {renderEditable('name', timeName, nameRef)}
        </span>
        <span className="tracker-value">
          {renderEditable('currentYear', currentYear, currentYearRef)} / {renderEditable('endYear', endYear, endYearRef)}
        </span>
      </div>
      <div className="tracker-bar time-bar">
        <div className="tracker-bar-filled time-bar-filled" style={{ width: `${filledWidth}%` }}></div>
      </div>
    </div>
  );
};

export default TimeMeter;
