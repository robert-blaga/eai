import React from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button } from '@mui/material';
import { updateQuestionActions } from '../../redux/gameSlice';
import Action from './Action';
import './ActionList.css';

const ActionList = ({ questionIndex, editable, initialQuestion, initialActions, selectedActionIndex, setSelectedActionIndex }) => {
  const dispatch = useDispatch();

  const handleActionChange = (index, field, value) => {
    const updatedActions = initialActions.map((action, i) => 
      i === index ? { ...action, [field]: value } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleActionSelect = (index) => {
    if (!editable) {
      setSelectedActionIndex(index);
    }
  };

  return (
    <Box className="action-list">
      <Typography variant="h6" gutterBottom>{initialQuestion}</Typography>
      {initialActions.map((action, index) => (
        <Action
          key={index}
          text={action.text}
          effort={action.effort}
          impact={action.impact}
          onSelect={() => handleActionSelect(index)}
          editable={editable}
          onTextChange={(value) => handleActionChange(index, 'text', value)}
          onEffortChange={(value) => handleActionChange(index, 'effort', value)}
          onImpactChange={(value) => handleActionChange(index, 'impact', value)}
          isSelected={selectedActionIndex === index}
        />
      ))}
      {editable && (
        <Button 
          variant="contained" 
          color="primary" 
          onClick={() => dispatch(updateQuestionActions({ 
            questionIndex, 
            actions: [...initialActions, { text: 'New Action', effort: 0, impact: 0 }] 
          }))}
        >
          Add New Action
        </Button>
      )}
    </Box>
  );
};

export default ActionList;
