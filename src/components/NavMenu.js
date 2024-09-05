import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AppBar, Toolbar, IconButton, Box } from '@mui/material';
import { Home, Settings, Gamepad, Dashboard, LibraryBooks } from '@mui/icons-material';

const menuItems = [
  { icon: <Home />, path: '/' },
  { icon: <Dashboard />, path: '/dashboard' },
  { icon: <Settings />, path: '/setup' },
  { icon: <Gamepad />, path: '/play' },
  { icon: <LibraryBooks />, path: '/library' },
];

const NavMenu = () => {
  const location = useLocation();

  return (
    <AppBar 
      position="fixed" 
      color="transparent" 
      elevation={0} 
      sx={{ 
        backgroundColor: 'white',
        borderBottom: '1px solid #e0e0e0',
        top: 0,
        left: 0,
        right: 0,
        height: '40px',
      }}
    >
      <Toolbar 
        disableGutters 
        sx={{ 
          height: '100%', 
          minHeight: '40px !important',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <Box sx={{ display: 'flex', height: '100%', alignItems: 'center' }}>
          {menuItems.map((item) => {
            const isSelected = location.pathname === item.path;
            return (
              <IconButton
                key={item.path}
                component={Link}
                to={item.path}
                color={isSelected ? 'primary' : 'default'}
                sx={{ 
                  mx: 1,
                  padding: '4px',
                  height: '32px',
                  width: '32px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                }}
              >
                <Box component="span" sx={{ display: 'flex', '& > svg': { fontSize: '1.2rem' } }}>
                  {item.icon}
                </Box>
              </IconButton>
            );
          })}
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default NavMenu;
