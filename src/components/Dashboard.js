import React from 'react';
import { Box, Typography, Grid, Paper } from '@mui/material';
import EffortMeter from './trackers/EffortMeter';
import ImpactMeter from './trackers/ImpactMeter';
import TimeMeter from './trackers/TimeMeter';
import Rewards from './trackers/Rewards';

const Dashboard = () => {
  return (
    <Box sx={{ flexGrow: 1, p: 3 }}>
      <Typography variant="h4" gutterBottom>Game Dashboard</Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <EffortMeter />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <ImpactMeter />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <TimeMeter />
          </Paper>
        </Grid>
        <Grid item xs={12} sm={6} md={3}>
          <Paper elevation={3} sx={{ p: 2 }}>
            <Rewards />
          </Paper>
        </Grid>
      </Grid>
    </Box>
  );
};

export default Dashboard;
