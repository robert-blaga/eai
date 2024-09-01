import React from 'react';
import { useSelector } from 'react-redux';
import './Action.css';

const Action = ({ text, effort, impact, onSelect, editable, onTextChange, onEffortChange, onImpactChange, isSelected }) => {
  const { effortName } = useSelector(state => state.game);

  const handleEffortChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '' || value === '-') {
      onEffortChange(value === '' || value === '-' ? value : Number(value));
    }
  };

  const handleImpactChange = (e) => {
    const value = e.target.value;
    if (!isNaN(value) || value === '' || value === '-') {
      onImpactChange(value === '' || value === '-' ? value : Number(value));
    }
  };

  return (
    <div className={`action ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="action-text">
        {editable ? (
          <textarea 
            value={text} 
            onChange={(e) => onTextChange(e.target.value)} 
            className="editable"
          />
        ) : (
          text
        )}
      </div>
      <div className="action-metrics">
        <div className="action-effort">
          <span className="effort-label">{effortName}</span>
          {editable ? (
            <input 
              type="text" 
              value={effort} 
              onChange={handleEffortChange} 
              className="editable effort-value"
            />
          ) : (
            <span className="effort-value">{effort}</span>
          )}
        </div>
        <div className="action-impact">
          <span className="impact-label">Impact</span>
          {editable ? (
            <input 
              type="text" 
              value={impact} 
              onChange={handleImpactChange} 
              className="editable impact-value"
            />
          ) : (
            <span className="impact-value">{impact}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Action;
