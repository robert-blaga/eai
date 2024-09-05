import React, { useState } from 'react';
import { Box, Typography, TextField, IconButton, Divider, Select, MenuItem } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Action = React.memo(({ 
  text, 
  effort, 
  impact, 
  reward, 
  editable, 
  onTextChange, 
  onEffortChange, 
  onImpactChange, 
  onRewardChange, 
  onSelect, 
  isSelected, 
  onDelete, 
  availableRewards,
  showReward = false
}) => {
  const MeterCard = ({ label, value, onChange, isReward }) => {
    const [localValue, setLocalValue] = useState(value);

    const handleChange = (e) => {
      const newValue = e.target.value;
      if (newValue === '' || /^-?\d*\.?\d*$/.test(newValue)) {
        setLocalValue(newValue);
      }
    };

    const handleBlur = () => {
      if (localValue === '') {
        setLocalValue('0');
        onChange('0');
      } else {
        onChange(localValue);
      }
    };

    return (
      <Box sx={{ width: 80, height: 80, display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <Typography variant="body2" sx={{ color: '#666', mb: 1, textAlign: 'center' }}>{label}</Typography>
        {isReward ? (
          showReward ? (
            <Typography variant="body2" sx={{ color: '#000', fontWeight: 'bold' }}>
              {localValue || 'None'}
            </Typography>
          ) : (
            <Select
              value={localValue || ''}
              onChange={(e) => {
                setLocalValue(e.target.value);
                onChange(e.target.value);
              }}
              variant="standard"
              sx={{
                width: '90%',
                '& .MuiSelect-select': {
                  paddingRight: '0px !important',
                  fontSize: '0.75rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '&:before': { borderBottom: 'none' },
                '&:after': { borderBottom: 'none' },
                '&:hover:not(.Mui-disabled):before': { borderBottom: 'none' },
              }}
              IconComponent={() => null}
            >
              <MenuItem value=""><em>None</em></MenuItem>
              {availableRewards.map((rewardOption) => (
                <MenuItem key={rewardOption.name} value={rewardOption.name} sx={{ fontSize: '0.75rem' }}>
                  {rewardOption.name}
                </MenuItem>
              ))}
            </Select>
          )
        ) : (
          <TextField
            value={localValue}
            onChange={handleChange}
            onBlur={handleBlur}
            variant="standard"
            type="text"
            inputProps={{
              inputMode: 'decimal',
              style: { textAlign: 'center', fontSize: '0.75rem' },
            }}
            InputProps={{ 
              disableUnderline: true,
              style: { fontSize: '0.75rem', color: '#000000' }
            }}
            sx={{ width: '90%' }}
          />
        )}
      </Box>
    );
  };

  return (
    <Box 
      sx={{ 
        border: '2px solid #000000', 
        borderRadius: '8px', 
        padding: '15px', 
        backgroundColor: isSelected ? '#CCFFCC' : '#ffffff',
        mb: 2,
        cursor: editable ? 'default' : 'pointer',
        position: 'relative',
        display: 'flex',
        alignItems: 'stretch',
      }}
      onClick={() => !editable && onSelect()}
    >
      {editable && (
        <IconButton 
          onClick={(e) => {
            e.stopPropagation();
            onDelete();
          }}
          sx={{ 
            position: 'absolute',
            top: '5px',
            right: '5px',
            color: '#999',
            '&:hover': {
              color: '#000',
            },
          }}
          size="small"
        >
          <DeleteOutlineIcon fontSize="small" />
        </IconButton>
      )}
      <Box sx={{ flex: 1, mr: 2 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <LightbulbIcon sx={{ color: '#000000', mr: 1 }} />
          {editable ? (
            <TextField
              fullWidth
              value={text}
              onChange={(e) => onTextChange(e.target.value)}
              variant="standard"
              InputProps={{ 
                disableUnderline: true,
                style: { 
                  fontWeight: 'bold',
                  color: '#000000',
                  fontSize: '1.1rem',
                }
              }}
              placeholder="Action Text"
            />
          ) : (
            <Typography variant="subtitle1" sx={{ fontWeight: 'bold', color: '#000000' }}>
              {text}
            </Typography>
          )}
        </Box>
      </Box>
      <Divider orientation="vertical" flexItem sx={{ mr: 2 }} />
      <Box sx={{ display: 'flex', justifyContent: 'space-around', alignItems: 'center', width: 300 }}>
        <MeterCard label="Reward" value={reward} onChange={onRewardChange} isReward={true} />
        <Divider orientation="vertical" flexItem sx={{ height: '80%' }} />
        <MeterCard label="Effort" value={effort} onChange={onEffortChange} />
        <Divider orientation="vertical" flexItem sx={{ height: '80%' }} />
        <MeterCard label="Impact" value={impact} onChange={onImpactChange} />
      </Box>
    </Box>
  );
});

export default Action;
