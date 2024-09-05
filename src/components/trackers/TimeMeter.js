import React, { useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { setTimeName, setCurrentYear, setEndYear } from '../../redux/gameSlice';
import { Box, Typography, LinearProgress } from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';

const TimeMeter = ({ editable = false }) => {
  const dispatch = useDispatch();
  const { timeName, currentYear, startYear, endYear } = useSelector(state => state.game);
  const nameRef = useRef(null);
  const currentYearRef = useRef(null);
  const endYearRef = useRef(null);

  const handleBlur = (field) => {
    switch (field) {
      case 'name':
        dispatch(setTimeName(nameRef.current.textContent));
        break;
      case 'currentYear':
        dispatch(setCurrentYear(Number(currentYearRef.current.textContent)));
        break;
      case 'endYear':
        dispatch(setEndYear(Number(endYearRef.current.textContent)));
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

  const totalYears = endYear - startYear;
  const progress = ((currentYear - startYear) / totalYears) * 100;

  return (
    <Box sx={{ 
      border: '2px solid #000000', 
      borderRadius: '8px', 
      padding: '15px', 
      backgroundColor: '#ffffff'
    }}>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <AccessTimeIcon sx={{ color: '#000000', mr: 1 }} />
          <Typography variant="subtitle1" component="div" sx={{ fontWeight: 'bold', color: '#000000' }}>
            {renderEditable('name', timeName, nameRef)}
          </Typography>
        </Box>
        <Typography variant="body1" sx={{ color: '#000000' }}>
          {renderEditable('currentYear', currentYear, currentYearRef)} / {renderEditable('endYear', endYear, endYearRef)}
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

export default TimeMeter;
