import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Card, Input, TextareaAutosize, Button, Box, IconButton } from '@mui/material';
import { Plus } from 'lucide-react';
import Action from './Action';
import { updateQuestionActions, updateQuestionParagraph, updateQuestionTitle, deleteQuestion } from '../../redux/gameSlice';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionList = ({ questionIndex, editable, initialQuestion, initialActions, onActionSelect, selectedActionIndex }) => {
  const dispatch = useDispatch();
  const [questionTitle, setQuestionTitle] = useState(initialQuestion.title || '');
  const [questionParagraph, setQuestionParagraph] = useState(initialQuestion.questionParagraph || '');

  const handleActionChange = (index, field, value) => {
    const updatedActions = initialActions.map((action, i) => 
      i === index ? { ...action, [field]: value } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleParagraphChange = (e) => {
    setQuestionParagraph(e.target.value);
    dispatch(updateQuestionParagraph({ index: questionIndex, paragraph: e.target.value }));
  };

  const handleTitleChange = (e) => {
    setQuestionTitle(e.target.value);
    dispatch(updateQuestionTitle({ index: questionIndex, title: e.target.value }));
  };

  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion(questionIndex));
  };

  const handleDeleteAction = (actionIndex) => {
    const updatedActions = initialActions.filter((_, index) => index !== actionIndex);
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  return (
    <Box sx={{ 
      display: 'flex', 
      justifyContent: 'center', 
      width: '100%'
    }}>
      <Card sx={{ 
        padding: '15px', 
        backgroundColor: '#light gray',
        mb: 2,
        width: 'calc(100% - 40px)',
        maxWidth: '800px',
        mx: '20px'
      }}>
        <div className="space-y-4">
          {editable ? (
            <>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
                <div style={{ display: 'flex', alignItems: 'center', flex: 1 }}>
                  <HelpIcon sx={{ color: '#000000', mr: 1 }} />
                  <Input
                    value={questionTitle}
                    onChange={handleTitleChange}
                    placeholder="Question Title"
                    sx={{
                      fontWeight: 'bold',
                      color: '#000000',
                      fontSize: '1.1rem',
                      '& input': {
                        padding: '5px 0',
                      },
                    }}
                    fullWidth
                    disableUnderline
                  />
                </div>
                <IconButton onClick={handleDeleteQuestion} sx={{ color: 'black' }}>
                  <DeleteIcon />
                </IconButton>
              </div>
              <TextareaAutosize
                value={questionParagraph}
                onChange={handleParagraphChange}
                placeholder="Question Subtitle/Paragraph"
                style={{
                  width: '97%',
                  padding: '10px',
                  border: 'none',
                  borderRadius: '4px',
                  backgroundColor: 'white',
                  minHeight: '60px',
                  fontFamily: 'inherit',
                  fontSize: '0.9rem',
                  color: '#666',
                  outline: 'none',
                }}
              />
            </>
          ) : (
            <>
              <div style={{ display: 'flex', alignItems: 'center', marginBottom: '10px' }}>
                <HelpIcon sx={{ color: '#000000', mr: 1 }} />
                <h3 style={{ fontWeight: 'bold', color: '#000000', fontSize: '1.1rem', margin: 0 }}>{questionTitle}</h3>
              </div>
              <p style={{ color: '#666', fontSize: '0.9rem', margin: '0 0 15px 0' }}>{questionParagraph}</p>
            </>
          )}

          <div className="space-y-4">
            {initialActions.map((action, index) => (
              <Action
                key={index}
                text={action.text}
                effort={action.effort}
                impact={action.impact}
                editable={editable}
                onTextChange={(value) => handleActionChange(index, 'text', value)}
                onEffortChange={(value) => handleActionChange(index, 'effort', value)}
                onImpactChange={(value) => handleActionChange(index, 'impact', value)}
                onSelect={() => onActionSelect && onActionSelect(index)}
                isSelected={selectedActionIndex === index}
                onDelete={() => handleDeleteAction(index)}
              />
            ))}
          </div>
          
          {editable && (
            <Button 
              variant="outlined" 
              size="small" 
              onClick={() => dispatch(updateQuestionActions({ 
                questionIndex, 
                actions: [...initialActions, { text: 'New Action', effort: 0, impact: 0 }] 
              }))}
              sx={{ 
                mt: 2, 
                color: '#000000', 
                borderColor: '#000000',
                '&:hover': {
                  backgroundColor: '#CCFFCC',
                  borderColor: '#CCFFCC',
                }
              }}
            >
              <Plus className="mr-2 h-4 w-4" /> Add Option
            </Button>
          )}
        </div>
      </Card>
    </Box>
  );
}

export default ActionList;