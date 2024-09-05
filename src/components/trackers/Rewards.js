import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateRewards } from '../../redux/gameSlice';
import { Box, Typography, LinearProgress, IconButton } from '@mui/material';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import RewardsPopup from './RewardsPopup';
import RewardsPopupView from './RewardsPopupView';

const Rewards = ({ editable }) => {
  const dispatch = useDispatch();
  const { rewardsCount, rewards, earnedRewards } = useSelector(state => state.game);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [newlyEarnedReward, setNewlyEarnedReward] = useState(null);

  useEffect(() => {
    const lastEarnedReward = earnedRewards[earnedRewards.length - 1];
    if (lastEarnedReward && lastEarnedReward !== newlyEarnedReward) {
      setNewlyEarnedReward(lastEarnedReward);
      setIsPopupOpen(true);
    }
  }, [earnedRewards, newlyEarnedReward]);

  const rewardsTotal = rewards.length;

  const handleIconClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  const handleSaveRewards = (updatedRewards) => {
    dispatch(updateRewards(updatedRewards));
  };

  const progress = rewardsTotal > 0 ? (rewardsCount / rewardsTotal) * 100 : 0;

  return (
    <>
      <Box sx={{ 
        border: '2px solid #000000', 
        borderRadius: '8px', 
        padding: '15px', 
        backgroundColor: '#ffffff'
      }}>
        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <IconButton onClick={handleIconClick}>
              <EmojiEventsIcon sx={{ color: '#000000', mr: 1 }} />
            </IconButton>
            <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
              Rewards
            </Typography>
          </Box>
          <Typography variant="body1" sx={{ color: '#000000' }}>
            {`${rewardsCount} / ${rewardsTotal}`}
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
      {isPopupOpen && (
        editable ? (
          <RewardsPopup 
            onClose={handleClosePopup} 
            initialRewards={rewards} 
            onSave={handleSaveRewards}
            earnedRewards={earnedRewards}
            newlyEarnedReward={newlyEarnedReward}
          />
        ) : (
          <RewardsPopupView 
            onClose={handleClosePopup}
            rewards={rewards}
            earnedRewards={earnedRewards}
            newlyEarnedReward={newlyEarnedReward}
          />
        )
      )}
    </>
  );
};

export default Rewards;