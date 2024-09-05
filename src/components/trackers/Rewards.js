import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setRewardsCount, setRewardsTotal } from '../../redux/gameSlice';
import { Box, Typography, LinearProgress } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';

const Rewards = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { rewardsCount, rewardsTotal } = useSelector(state => state.game);

  const handleCountChange = (e) => {
    if (editable) {
      dispatch(setRewardsCount(Number(e.target.value)));
    }
  };

  const handleTotalChange = (e) => {
    if (editable) {
      dispatch(setRewardsTotal(Number(e.target.value)));
    }
  };

  const progress = (rewardsCount / rewardsTotal) * 100;

  return (
    <Box sx={{ 
      border: '2px solid #000000', 
      borderRadius: '8px', 
      padding: '15px', 
      backgroundColor: '#ffffff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <EmojiEventsIcon sx={{ color: '#000000', mr: 1 }} />
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
            Rewards
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#000000' }}>
          {editable ? (
            <>
              <input 
                type="number" 
                value={rewardsCount} 
                onChange={handleCountChange}
                style={{ width: '30px', textAlign: 'center', border: 'none', background: 'transparent' }}
              />
              {' / '}
              <input 
                type="number" 
                value={rewardsTotal} 
                onChange={handleTotalChange}
                style={{ width: '30px', textAlign: 'center', border: 'none', background: 'transparent' }}
              />
            </>
          ) : (
            `${rewardsCount} / ${rewardsTotal}`
          )}
        </Typography>
      </Box>
      <LinearProgress 
        variant="determinate" 
        value={progress} 
        sx={{ 
          height: 10, 
          borderRadius: 5, 
          backgroundColor: '#D3D3D3',
          '& .MuiLinearProgress-bar': {
            backgroundColor: '#000000'
          }
        }} 
      />
    </Box>
  );
};

export default Rewards;