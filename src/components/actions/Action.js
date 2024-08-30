import React from 'react';
import { useSelector } from 'react-redux';
import './Action.css';

const Action = ({ text, effort, impact, onSelect, editable, onTextChange, onEffortChange, onImpactChange, isSelected }) => {
  const { effortName } = useSelector(state => state.game);

  return (
    <div className={`action ${isSelected ? 'selected' : ''}`} onClick={onSelect}>
      <div className="action-text">
        {editable ? (
          <input 
            type="text" 
            value={text} 
            onChange={(e) => onTextChange(e.target.value)} 
            className="editable"
          />
        ) : (
          text
        )}
      </div>
      <div className="action-effort">
        <span className="effort-label">{effortName}</span>
        {editable ? (
          <input 
            type="number" 
            value={effort} 
            onChange={(e) => onEffortChange(Number(e.target.value))} 
            className="editable effort-value"
          />
        ) : (
          <span className="effort-value">{effort}</span>
        )}
      </div>
      {editable && (
        <div className="action-impact">
          Impact: 
          <input 
            type="number" 
            value={impact} 
            onChange={(e) => onImpactChange(Number(e.target.value))} 
            className="editable"
          />
        </div>
      )}
    </div>
  );
};

export default Action;
