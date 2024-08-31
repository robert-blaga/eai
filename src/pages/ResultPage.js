import React from 'react';
import { useSelector } from 'react-redux';
import { Box, Typography, Paper } from '@mui/material';
import EffortMeter from '../components/trackers/EffortMeter';
import ImpactMeter from '../components/trackers/ImpactMeter';
import TimeMeter from '../components/trackers/TimeMeter';
import Rewards from '../components/trackers/Rewards';

const ResultPage = () => {
  const { effortPoints, impactPoints, currentYear, rewardsCount } = useSelector(state => state.game);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', p: 3 }}>
      <Typography variant="h4" gutterBottom>Your Final Results</Typography>
      <Box sx={{ display: 'flex', gap: 3, mb: 3 }}>
        <EffortMeter editable={false} />
        <ImpactMeter editable={false} />
        <TimeMeter editable={false} />
        <Rewards editable={false} />
      </Box>
      <Paper elevation={3} sx={{ p: 3 }}>
        <Typography variant="h5" gutterBottom>Summary</Typography>
        <Typography>Effort Points Remaining: {effortPoints}</Typography>
        <Typography>Impact Points Achieved: {impactPoints}</Typography>
        <Typography>Year Reached: {currentYear}</Typography>
        <Typography>Rewards Earned: {rewardsCount}</Typography>
      </Paper>
    </Box>
  );
};

export default ResultPage;
