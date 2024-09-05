import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Card, Input, TextareaAutosize, Button, Box, IconButton } from '@mui/material';
import { Plus } from 'lucide-react';
import Action from './Action';
import { updateQuestionActions, updateQuestionParagraph, updateQuestionTitle, deleteQuestion } from '../../redux/gameSlice';
import HelpIcon from '@mui/icons-material/Help';
import DeleteIcon from '@mui/icons-material/Delete';

const ActionList = ({ questionIndex, editable, initialQuestion, initialActions, onActionSelect, selectedActionIndex, showReward = false }) => {
  const dispatch = useDispatch();
  const rewards = useSelector(state => state.game.rewards);
  const [questionTitle, setQuestionTitle] = useState(initialQuestion.title || '');
  const [questionParagraph, setQuestionParagraph] = useState(initialQuestion.questionParagraph || '');

  useEffect(() => {
    setQuestionTitle(initialQuestion.title || '');
    setQuestionParagraph(initialQuestion.questionParagraph || '');
  }, [initialQuestion]);

  const handleActionChange = (index, field, value) => {
    const updatedActions = initialActions.map((action, i) => 
      i === index ? { ...action, [field]: value } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleParagraphChange = (e) => {
    const newParagraph = e.target.value;
    setQuestionParagraph(newParagraph);
    dispatch(updateQuestionParagraph({ index: questionIndex, paragraph: newParagraph }));
  };

  const handleTitleChange = (e) => {
    const newTitle = e.target.value;
    setQuestionTitle(newTitle);
    dispatch(updateQuestionTitle({ index: questionIndex, title: newTitle }));
  };

  const handleDeleteQuestion = () => {
    dispatch(deleteQuestion(questionIndex));
  };

  const handleDeleteAction = (actionIndex) => {
    const updatedActions = initialActions.filter((_, index) => index !== actionIndex);
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleRewardChange = (actionIndex, newReward) => {
    const updatedActions = initialActions.map((action, index) => 
      index === actionIndex ? { ...action, reward: newReward } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleEffortChange = (actionIndex, newEffort) => {
    const numEffort = Number(newEffort);
    const validEffort = !isNaN(numEffort) ? Math.max(-1000, Math.min(1000, numEffort)) : 0;
    const updatedActions = initialActions.map((action, index) => 
      index === actionIndex ? { ...action, effort: validEffort } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleImpactChange = (actionIndex, newImpact) => {
    const numImpact = Number(newImpact);
    const validImpact = !isNaN(numImpact) ? Math.max(-1000, Math.min(1000, numImpact)) : 0;
    const updatedActions = initialActions.map((action, index) => 
      index === actionIndex ? { ...action, impact: validImpact } : action
    );
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
                reward={action.reward}
                editable={editable}
                onTextChange={(value) => handleActionChange(index, 'text', value)}
                onEffortChange={(newEffort) => handleEffortChange(index, newEffort)}
                onImpactChange={(newImpact) => handleImpactChange(index, newImpact)}
                onRewardChange={(newReward) => handleRewardChange(index, newReward)}
                onSelect={() => onActionSelect && onActionSelect(index)}
                isSelected={selectedActionIndex === index}
                onDelete={() => handleDeleteAction(index)}
                availableRewards={rewards}
                showReward={showReward}
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