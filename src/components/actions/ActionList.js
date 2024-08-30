import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Action from './Action';
import { updateQuestion, updateQuestionActions, updateQuestionParagraph } from '../../redux/gameSlice';
import './ActionList.css';

const ActionList = ({ questionIndex, editable, onNextQuestion }) => {
  const dispatch = useDispatch();
  const { questions, currentQuestionIndex } = useSelector(state => state.game);
  const { question, questionParagraph, actions } = questions[questionIndex];
  const [selectedActionIndex, setSelectedActionIndex] = useState(null);

  const isLastQuestion = currentQuestionIndex === questions.length - 1;
  const nextButtonText = isLastQuestion ? "Submit last question" : "Next question";

  const handleQuestionChange = (newQuestion) => {
    dispatch(updateQuestion({ index: questionIndex, question: newQuestion }));
  };

  const handleQuestionParagraphChange = (newParagraph) => {
    dispatch(updateQuestionParagraph({ index: questionIndex, paragraph: newParagraph }));
  };

  const handleActionChange = (index, field, value) => {
    const updatedActions = actions.map((action, i) => 
      i === index ? { ...action, [field]: value } : action
    );
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleAddNewAction = () => {
    const updatedActions = [...actions, { text: 'New Action', effort: 0, impact: 0 }];
    dispatch(updateQuestionActions({ questionIndex, actions: updatedActions }));
  };

  const handleActionSelect = (index) => {
    setSelectedActionIndex(index);
  };

  return (
    <div className="action-list">
      <div className="question-card">
        {editable ? (
          <input 
            type="text" 
            value={question} 
            onChange={(e) => handleQuestionChange(e.target.value)} 
            className="question editable"
          />
        ) : (
          <p className="question">{question}</p>
        )}
        <div className="question-divider"></div>
        <textarea
          className="question-paragraph"
          value={questionParagraph}
          onChange={(e) => handleQuestionParagraphChange(e.target.value)}
          placeholder="Enter additional details about the question..."
          rows={3}
          readOnly={!editable}
        />
        {actions.map((action, index) => (
          <Action 
            key={index} 
            {...action} 
            editable={editable}
            onTextChange={(value) => handleActionChange(index, 'text', value)}
            onEffortChange={(value) => handleActionChange(index, 'effort', value)}
            onImpactChange={(value) => handleActionChange(index, 'impact', value)}
            onSelect={() => handleActionSelect(index)}
            isSelected={selectedActionIndex === index}
          />
        ))}
        {editable && (
          <button className="add-action" onClick={handleAddNewAction}>Add New Action</button>
        )}
        {!editable && (
          <button 
            onClick={() => onNextQuestion(actions[selectedActionIndex])}
            disabled={selectedActionIndex === null}
            className="next-question"
          >
            {nextButtonText}
          </button>
        )}
      </div>
    </div>
  );
};

export default ActionList;
