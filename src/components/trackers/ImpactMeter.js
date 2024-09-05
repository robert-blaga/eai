import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setImpactName, setImpactPoints, setImpactPointsName } from '../../redux/gameSlice';
import { Box, Typography, LinearProgress } from '@mui/material';
import { GpsFixed as TargetIcon } from '@mui/icons-material';

const ImpactMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { impactName, impactPoints, impactPointsName } = useSelector(state => state.game);
  const nameRef = useRef(null);
  const pointsRef = useRef(null);
  const pointsNameRef = useRef(null);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        dispatch(setImpactName(nameRef.current.textContent));
        break;
      case 'points':
        dispatch(setImpactPoints(Number(pointsRef.current.textContent)));
        break;
      case 'pointsName':
        dispatch(setImpactPointsName(pointsNameRef.current.textContent));
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
        onBlur={() => handleBlur(field)}
        suppressContentEditableWarning={true}
        style={{ minWidth: '20px', display: 'inline-block' }}
      >
        {value}
      </span>
    );
  };

  const maxImpact = 100;
  const progress = (impactPoints / maxImpact) * 100;

  return (
    <Box sx={{ 
      border: '2px solid #000000', 
      borderRadius: '8px', 
      padding: '15px', 
      backgroundColor: '#ffffff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <TargetIcon sx={{ color: '#000000', mr: 1 }} />
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
            {renderEditable('name', impactName, nameRef)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#000000' }}>
          {renderEditable('points', impactPoints, pointsRef)} {renderEditable('pointsName', impactPointsName, pointsNameRef)}
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

export default ImpactMeter;
