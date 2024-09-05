import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Button } from "../components/ui/button";
import GameInfo from '../components/GameInfo';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';
import ActionList from '../components/actions/ActionList';
import { addQuestion, saveGame, updateGame, setEffortName, setImpactName, setTimeName } from '../redux/gameSlice';
import { Save } from 'lucide-react'; // Import Save icon from lucide-react
import IconButton from '@mui/material/IconButton';

const GameSetupPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const gameState = useSelector(state => state.game);
  
  const [gameName, setGameName] = useState('');
  const [gameDescription, setGameDescription] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    setGameName(gameState.name || '');
    setGameDescription(gameState.description || '');
  }, [gameState]);

  const handleAddQuestion = () => {
    dispatch(addQuestion());
  };

  const handleEffortNameChange = (name) => {
    dispatch(setEffortName(name));
  };

  const handleImpactNameChange = (name) => {
    dispatch(setImpactName(name));
  };

  const handleTimeNameChange = (name) => {
    dispatch(setTimeName(name));
  };

  const handleSaveGame = async () => {
    if (gameName) {
      setIsSaving(true);
      try {
        const gameData = {
          ...gameState,
          name: gameName,
          description: gameDescription,
          initialEffortPoints: gameState.effortPoints,
          startYear: gameState.currentYear,
        };
        if (gameState.id) {
          await dispatch(updateGame({ id: gameState.id, gameData })).unwrap();
          alert("Game updated successfully!");
        } else {
          await dispatch(saveGame(gameData)).unwrap();
          alert("Game saved successfully!");
        }
        navigate('/library');
      } catch (error) {
        console.error("Error saving game: ", error);
        alert("Error saving game. Please try again.");
      } finally {
        setIsSaving(false);
      }
    } else {
      alert("Please enter a name for your game.");
    }
  };

  return (
    <div className="game-setup-page">
      <div className="content-container">
        <div className="sidebar">
          <GameInfo
            gameName={gameName}
            gameDescription={gameDescription}
            onNameChange={setGameName}
            onDescriptionChange={setGameDescription}
          />
          <div className="section">
            <h5>Trackers</h5>
            <div className="trackers">
              <div className="tracker-container">
                <EffortMeter editable={true} onNameChange={handleEffortNameChange} />
              </div>
              <div className="tracker-container">
                <ImpactMeter editable={true} onNameChange={handleImpactNameChange} />
              </div>
              <div className="tracker-container">
                <TimeMeter editable={true} onNameChange={handleTimeNameChange} />
              </div>
              <div className="tracker-container">
                <Rewards editable={true} />
              </div>
            </div>
          </div>
        </div>
        <div className="main-content">
          <div className="section">
            <div className="questions-container">
              {gameState.questions.map((question, index) => (
                <ActionList key={index} questionIndex={index} editable={true} initialQuestion={question} initialActions={question.actions} />
              ))}
            </div>
            <Button onClick={handleAddQuestion} className="add-question-button">
              Add Question
            </Button>
          </div>
        </div>
      </div>
      <IconButton onClick={handleSaveGame} disabled={isSaving} className="save-game-icon" style={{ position: 'fixed', bottom: '20px', right: '20px', backgroundColor: '#CCFFCC', color: 'CCFFCC' }}>
        <Save />
      </IconButton>
    </div>
  );
}

export default GameSetupPage;