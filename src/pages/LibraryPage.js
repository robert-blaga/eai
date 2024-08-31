import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { loadGame } from '../redux/gameSlice';

const LibraryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedGames = useSelector(state => state.game.savedGames);

  const handlePlayGame = (gameState) => {
    dispatch(loadGame(gameState));
    navigate('/play');
  };

  const handleEditGame = (gameState) => {
    dispatch(loadGame(gameState));
    navigate('/setup');
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Game Library</Typography>
      <List>
        {savedGames.map((game, index) => (
          <ListItem key={index} divider>
            <ListItemText 
              primary={game.name} 
              secondary={game.description}
            />
            <Box>
              <Button variant="contained" color="primary" onClick={() => handlePlayGame(game.state)} sx={{ mr: 1 }}>
                Play
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleEditGame(game.state)}>
                Edit
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LibraryPage;
