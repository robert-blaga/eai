import React from 'react';
import ReactDOM from 'react-dom';
import { Box, Typography, IconButton, Card, CardContent } from '@mui/material';
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

const RewardsPopupView = ({ onClose, rewards, earnedRewards, newlyEarnedReward }) => {
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
          <IconButton onClick={onClose} sx={{ color: '#34495e' }}>
            <CloseIcon />
          </IconButton>
        </Box>
        {rewards.length === 0 ? (
          <Typography variant="body1" sx={{ textAlign: 'center', my: 4 }}>
            No rewards available.
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
                      margin: '0 auto',
                    }}
                  >
                    {React.cloneElement(
                      iconOptions.find(option => option.name === reward.icon)?.icon,
                      { sx: { color: iconOptions.find(option => option.name === reward.icon)?.color } }
                    )}
                  </Box>
                  <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                    {reward.name}
                  </Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    Required: {reward.requiredNumber}
                  </Typography>
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </motion.div>
    </motion.div>
  );

  return ReactDOM.createPortal(popupContent, document.body);
};

export default RewardsPopupView;
