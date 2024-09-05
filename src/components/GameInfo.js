import React from 'react';
import { Box, Typography, TextField } from '@mui/material';
import GamepadIcon from '@mui/icons-material/Gamepad';

const GameInfo = ({ gameName, gameDescription, onNameChange, onDescriptionChange, editable = true }) => {
  return (
    <Box sx={{ 
      border: '2px solid #000000', 
      borderRadius: '8px', 
      padding: '15px', 
      backgroundColor: '#ffffff',
      mb: 2
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
        <GamepadIcon sx={{ color: '#000000', mr: 1 }} />
        <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
          Game Information
        </Typography>
      </Box>
      <TextField
        fullWidth
        label="Game Name"
        variant="outlined"
        value={gameName}
        onChange={(e) => onNameChange(e.target.value)}
        disabled={!editable}
        sx={{ mb: 2 }}
        InputProps={{
          sx: { backgroundColor: 'white' }
        }}
      />
      <TextField
        fullWidth
        label="Game Description"
        variant="outlined"
        value={gameDescription}
        onChange={(e) => onDescriptionChange(e.target.value)}
        disabled={!editable}
        multiline
        rows={3}
        InputProps={{
          sx: { backgroundColor: 'white' }
        }}
      />
    </Box>
  );
};

export default GameInfo;
