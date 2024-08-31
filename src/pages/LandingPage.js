import React from 'react';
import { Typography, Button, Box } from '@mui/material';
import { Link } from 'react-router-dom';

const LandingPage = () => {
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh' }}>
      <Typography variant="h2" gutterBottom>
        Welcome to the Game
      </Typography>
      <Typography variant="h5" gutterBottom>
        What do you want to do?
      </Typography>
      <Box sx={{ display: 'flex', gap: 2, mt: 4 }}>
        <Button component={Link} to="/setup" variant="contained" color="primary">
          Setup
        </Button>
        <Button component={Link} to="/play" variant="contained" color="secondary">
          Play
        </Button>
      </Box>
    </Box>
  );
};

export default LandingPage;
