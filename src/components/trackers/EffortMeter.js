import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setEffortName, setEffortPoints, setPointsName } from '../../redux/gameSlice';
import { Box, Typography, LinearProgress } from '@mui/material';
import BatteryChargingFullIcon from '@mui/icons-material/BatteryChargingFull';

const EffortMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { effortName, effortPoints, pointsName } = useSelector(state => state.game);
  const nameRef = useRef(null);
  const pointsRef = useRef(null);
  const pointsNameRef = useRef(null);

  const handleBlur = (field, ref) => {
    const value = ref.current.textContent;
    switch (field) {
      case 'name':
        dispatch(setEffortName(value));
        break;
      case 'points':
        dispatch(setEffortPoints(Number(value)));
        break;
      case 'pointsName':
        dispatch(setPointsName(value));
        break;
      default:
        break;
    }
  };

  const renderEditable = (field, value, ref) => {
    return (
      <span
        ref={ref}
        contentEditable={editable}
        onBlur={() => handleBlur(field, ref)}
        suppressContentEditableWarning={true}
        style={{ minWidth: '20px', display: 'inline-block' }}
      >
        {value}
      </span>
    );
  };

  const maxEffort = 100;
  const progress = (effortPoints / maxEffort) * 100;

  return (
    <Box sx={{ 
      border: '2px solid #000000', 
      borderRadius: '8px', 
      padding: '15px', 
      backgroundColor: '#ffffff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <BatteryChargingFullIcon sx={{ color: '#000000', mr: 1 }} />
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
            {renderEditable('name', effortName, nameRef)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#000000' }}>
          {renderEditable('points', effortPoints, pointsRef)} {renderEditable('pointsName', pointsName, pointsNameRef)}
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

export default EffortMeter;
