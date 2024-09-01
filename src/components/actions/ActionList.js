import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Box, Typography, Button, TextField } from '@mui/material';
import { updateQuestionActions, updateQuestionParagraph, updateQuestionTitle } from '../../redux/gameSlice';
import Action from './Action';
import './ActionList.css';

const ActionList = ({ questionIndex, editable, initialQuestion, initialActions, selectedActionIndex, setSelectedActionIndex }) => {
  const dispatch = useDispatch();
  const [questionTitle, setQuestionTitle] = useState(initialQuestion.title || '');
  const [questionParagraph, setQuestionParagraph] = useState(initialQuestion.questionParagraph || '');

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

  const handleParagraphChange = (e) => {
    setQuestionParagraph(e.target.value);
    dispatch(updateQuestionParagraph({ index: questionIndex, paragraph: e.target.value }));
  };

  const handleTitleChange = (e) => {
    setQuestionTitle(e.target.value);
    dispatch(updateQuestionTitle({ index: questionIndex, title: e.target.value }));
  };

  return (
    <Box className="action-list">
      {editable ? (
        <TextField
          value={questionTitle}
          onChange={handleTitleChange}
          placeholder="Type question title here..."
          className="question-title-input"
          fullWidth
          InputProps={{ 
            disableUnderline: true, // Disable underline
            style: { 
              border: 'none', 
              padding: 0, 
              fontFamily: 'Poppins, sans-serif', 
              fontSize: '18px', 
              fontWeight: 700, 
              color: '#333', 
              marginBottom: '10px' 
            } // Remove border and padding, apply styles
          }}
          sx={{
            '& .MuiOutlinedInput-root': {
              '& fieldset': {
                border: 'none', // Remove border
              },
              '&.Mui-focused fieldset': {
                border: 'none', // Remove border when focused
              },
            },
            '& .MuiInputBase-input': {
              padding: 0, // Remove padding from input element
            },
          }}
        />
      ) : (
        <Typography variant="h6" gutterBottom className="question-title">
          {questionTitle}
        </Typography>
      )}
      {editable ? (
        <textarea
          value={questionParagraph}
          onChange={handleParagraphChange}
          placeholder="Type context for the question here..."
          className="question-paragraph-textarea"
        />
      ) : (
        <Typography variant="body1" gutterBottom className="question-paragraph">
          {questionParagraph}
        </Typography>
      )}
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
