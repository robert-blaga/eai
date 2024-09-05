import React from 'react';
import { Box, Typography, TextField, IconButton } from '@mui/material';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';

const Action = ({ text, effort, impact, editable, onTextChange, onEffortChange, onImpactChange, onSelect, isSelected, onDelete }) => {
  return (
    <Box 
      sx={{ 
        border: '2px solid #000000', 
        borderRadius: '8px', 
        padding: '15px', 
        backgroundColor: isSelected ? '#CCFFCC' : '#ffffff',
        mb: 2,
        cursor: editable ? 'default' : 'pointer',
        position: 'relative', // Add this for positioning the delete button
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
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>Effort:</Typography>
          {editable ? (
            <TextField
              type="number"
              value={effort}
              onChange={(e) => onEffortChange(e.target.value)}
              variant="standard"
              InputProps={{ 
                disableUnderline: true,
                style: { 
                  width: '40px',
                  textAlign: 'center',
                  fontSize: '1rem',
                  color: '#000000',
                }
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: '#000000' }}>{effort}</Typography>
          )}
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Typography variant="body2" sx={{ color: '#666', mr: 1 }}>Impact:</Typography>
          {editable ? (
            <TextField
              type="number"
              value={impact}
              onChange={(e) => onImpactChange(e.target.value)}
              variant="standard"
              InputProps={{ 
                disableUnderline: true,
                style: { 
                  width: '40px',
                  textAlign: 'center',
                  fontSize: '1rem',
                  color: '#000000',
                }
              }}
            />
          ) : (
            <Typography variant="body1" sx={{ color: '#000000' }}>{impact}</Typography>
          )}
        </Box>
      </Box>
    </Box>
  );
}

export default Action;
