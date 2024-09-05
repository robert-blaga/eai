import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Box, Typography, List, ListItem, ListItemText, Button } from '@mui/material';
import { loadGame, fetchGames, deleteGame } from '../redux/gameSlice';

const LibraryPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const savedGames = useSelector(state => state.game.savedGames);

  useEffect(() => {
    dispatch(fetchGames());
  }, [dispatch]);

  const handlePlayGame = (game) => {
    dispatch(loadGame(game));
    navigate('/play');
  };

  const handleEditGame = (game) => {
    dispatch(loadGame(game));
    navigate('/setup');
  };

  const handleDeleteGame = async (id) => {
    if (window.confirm('Are you sure you want to delete this game?')) {
      await dispatch(deleteGame(id));
    }
  };

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>Game Library</Typography>
      <List>
        {savedGames.map((game) => (
          <ListItem key={game.id} divider>
            <ListItemText 
              primary={game.name} 
              secondary={game.description}
            />
            <Box>
              <Button variant="contained" color="primary" onClick={() => handlePlayGame(game)} sx={{ mr: 1 }}>
                Play
              </Button>
              <Button variant="outlined" color="secondary" onClick={() => handleEditGame(game)} sx={{ mr: 1 }}>
                Edit
              </Button>
              <Button variant="outlined" color="error" onClick={() => handleDeleteGame(game.id)}>
                Delete
              </Button>
            </Box>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default LibraryPage;
