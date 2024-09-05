import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography, IconButton, TextField, Select, MenuItem, Button, Card, CardContent } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import StarIcon from '@mui/icons-material/Star';
import MilitaryTechIcon from '@mui/icons-material/MilitaryTech';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import BoltIcon from '@mui/icons-material/Bolt';
import DiamondIcon from '@mui/icons-material/Diamond';
import WorkspacePremiumIcon from '@mui/icons-material/WorkspacePremium';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FlagIcon from '@mui/icons-material/Flag';
import { motion } from 'framer-motion';

const iconOptions = [
  { name: "Trophy", icon: <EmojiEventsIcon />, color: '#FFD700' },
  { name: "Star", icon: <StarIcon />, color: '#FFA500' },
  { name: "Medal", icon: <MilitaryTechIcon />, color: '#C0C0C0' },
  { name: "Smiley", icon: <EmojiEmotionsIcon />, color: '#FFC0CB' },
  { name: "Fire", icon: <LocalFireDepartmentIcon />, color: '#FF4500' },
  { name: "Lightning", icon: <BoltIcon />, color: '#ADD8E6' },
  { name: "Diamond", icon: <DiamondIcon />, color: '#90EE90' },
  { name: "Premium", icon: <WorkspacePremiumIcon />, color: '#FF6347' },
  { name: "Sparkle", icon: <AutoAwesomeIcon />, color: '#FFDAB9' },
  { name: "Idea", icon: <LightbulbIcon />, color: '#FFA07A' },
  { name: "Heart", icon: <FavoriteIcon />, color: '#FF69B4' },
  { name: "Flag", icon: <FlagIcon />, color: '#87CEEB' },
];

const RewardsPopup = ({ onClose, initialRewards, onSave, earnedRewards, newlyEarnedReward, viewOnly = false }) => {
  const [rewards, setRewards] = useState(initialRewards || []);
  const [activeIconSelector, setActiveIconSelector] = useState(null);

  // Add this useEffect for debugging
  useEffect(() => {
    console.log("Current rewards:", rewards);
  }, [rewards]);

  const handleClose = () => {
    onSave(rewards);
    onClose();
  };

  const updateRewardName = (index, newName) => {
    const updatedRewards = rewards.map((reward, i) => 
      i === index ? { ...reward, name: newName } : reward
    );
    setRewards(updatedRewards);
  };

  const updateRewardIcon = (index, newIcon) => {
    const updatedRewards = rewards.map((reward, i) => 
      i === index ? { ...reward, icon: newIcon } : reward
    );
    setRewards(updatedRewards);
    setActiveIconSelector(null);
  };

  const updateRequiredNumber = (index, newNumber) => {
    const updatedRewards = rewards.map((reward, i) => 
      i === index ? { ...reward, requiredNumber: parseInt(newNumber) || 0 } : reward
    );
    setRewards(updatedRewards);
  };

  const popupContent = (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundColor: 'rgba(0, 0, 0, 0.7)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        zIndex: 9999,
      }}
    >
      <motion.div
        initial={{ scale: 0.9, y: 50 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 50 }}
        transition={{ type: 'spring', damping: 15 }}
        style={{
          backgroundColor: '#f0f4f8',
          padding: '2rem',
          borderRadius: '1rem',
          maxWidth: '600px',
          width: '90%',
          maxHeight: '90vh',
          overflowY: 'auto',
          boxShadow: '0 10px 25px rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
          <Typography variant="h4" sx={{ fontWeight: 'bold', color: '#2c3e50' }}>Your Rewards</Typography>
          <IconButton onClick={handleClose} sx={{ color: '#34495e' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {rewards.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            No rewards available. Try adding some!
          </Typography>
        ) : (
          <Box sx={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: 3, 
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',
          }}>
            {rewards.map((reward, index) => (
              <Card
                key={index}
                sx={{
                  width: 'calc(33.33% - 16px)',
                  position: 'relative',
                  borderRadius: '12px',
                  boxShadow: '0 4px 8px rgba(0,0,0,0.1)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 6px 12px rgba(0,0,0,0.15)',
                    transform: 'translateY(-5px)',
                  },
                  backgroundColor: earnedRewards.includes(reward.name) ? 
                    (newlyEarnedReward === reward.name ? '#90EE90' : '#E8F5E9') : 'white',
                }}
              >
                <IconButton
                  onClick={() => {
                    const updatedRewards = rewards.filter((_, i) => i !== index);
                    setRewards(updatedRewards);
                  }}
                  sx={{
                    position: 'absolute',
                    top: 5,
                    right: 5,
                    padding: '4px',
                    backgroundColor: 'rgba(255,255,255,0.8)',
                    '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
                  }}
                  size="small"
                >
                  <CloseIcon fontSize="small" />
                </IconButton>
                <CardContent sx={{ padding: '16px', textAlign: 'center' }}>
                  <Box 
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      border: '2px solid #e0e0e0',
                      mb: 2,
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      margin: '0 auto',
                      '&:hover': {
                        boxShadow: '0 0 15px rgba(0, 0, 0, 0.2)',
                      },
                    }}
                    onClick={() => setActiveIconSelector(activeIconSelector === index ? null : index)}
                  >
                    {React.cloneElement(
                      iconOptions.find(option => option.name === reward.icon)?.icon,
                      { sx: { color: iconOptions.find(option => option.name === reward.icon)?.color } }
                    )}
                  </Box>
                  {activeIconSelector === index && (
                    <Select
                      value={reward.icon}
                      onChange={(e) => updateRewardIcon(index, e.target.value)}
                      sx={{ mt: 1, width: '100%' }}
                      MenuProps={{
                        container: document.body,
                        style: { zIndex: 10000 }
                      }}
                    >
                      {iconOptions.map((option) => (
                        <MenuItem key={option.name} value={option.name}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            {React.cloneElement(option.icon, { sx: { color: option.color } })}
                            <Typography sx={{ ml: 1 }}>{option.name}</Typography>
                          </Box>
                        </MenuItem>
                      ))}
                    </Select>
                  )}
                  <TextField
                    value={reward.name}
                    onChange={(e) => updateRewardName(index, e.target.value)}
                    sx={{ 
                      mt: 1, 
                      width: '100%',
                      '& .MuiInputBase-root': {
                        border: 'none',
                      },
                      '& .MuiInput-underline:before': {
                        borderBottom: 'none',
                      },
                      '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
                        borderBottom: 'none',
                      },
                      '& .MuiInput-underline:after': {
                        borderBottom: 'none',
                      },
                    }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    variant="standard"
                  />
                  <TextField
                    value={reward.requiredNumber || ''}
                    onChange={(e) => updateRequiredNumber(index, e.target.value)}
                    type="number"
                    label="Required Number"
                    sx={{ 
                      mt: 2, 
                      width: '100%',
                    }}
                    inputProps={{ min: 0, style: { textAlign: 'center' } }}
                    variant="outlined"
                    size="small"
                  />
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
        <Button
          onClick={() => setRewards([...rewards, { name: 'New Reward', icon: 'Trophy', earned: false, requiredNumber: 0 }])}
          variant="contained"
          sx={{ 
            mt: 3, // Reduced from 20 to 3
            display: 'block', 
            margin: '20px auto',
            backgroundColor: 'black',
            color: 'white',
            '&:hover': {
              backgroundColor: '#333',
            },
          }}
        >
          Add +
        </Button>
      </motion.div>
    </motion.div>
  );

  return ReactDOM.createPortal(popupContent, document.body);
};

export default RewardsPopup;
