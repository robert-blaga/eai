import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText, Typography, styled } from '@mui/material';
import { Home, Settings, Gamepad, Dashboard, LibraryBooks } from '@mui/icons-material';

const drawerWidth = 300;

const menuItems = [
  { text: 'Home', icon: <Home />, path: '/' },
  { text: 'Dashboard', icon: <Dashboard />, path: '/dashboard' },
  { text: 'Create', icon: <Settings />, path: '/setup' },
  { text: 'Play', icon: <Gamepad />, path: '/play' },
  { text: 'Library', icon: <LibraryBooks />, path: '/library' },
];

const StyledListItem = styled(ListItem)(({ theme, selected }) => ({
  borderRadius: 99,
  margin: '4px 16px',
  padding: '12px 16px', // Reduced padding
  width: '240px',
  '&:hover, &.Mui-selected': {
    backgroundColor: '#EEF2FF',
    '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
      color: '#4F46E5',
    },
  },
  '& .MuiListItemIcon-root': {
    minWidth: 32, // Reduced minWidth
    color: selected ? '#4F46E5' : '#64748B',
  },
  '& .MuiListItemText-primary': {
    color: selected ? '#4F46E5' : '#64748B',
    fontFamily: 'Poppins, sans-serif',
    fontWeight: 500,
    fontSize: 18,
  },
  ...(selected && {
    backgroundColor: '#EEF2FF',
  }),
}));

const NavMenu = () => {
  const location = useLocation();

  return (
    <Drawer
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: drawerWidth,
          boxSizing: 'border-box',
          backgroundColor: 'white',
          color: 'gray',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Typography variant="h6" sx={{ my: 2, textAlign: 'left', color: 'black', fontFamily: 'Poppins, sans-serif', fontWeight: 900, fontSize: 20, marginLeft: 4 }}>
        Build cool stuff
      </Typography>
      <List>
        {menuItems.map((item) => {
          const isSelected = location.pathname === item.path;
          return (
            <StyledListItem
              button
              key={item.text}
              component={Link}
              to={item.path}
              selected={isSelected}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </StyledListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

export default NavMenu;
