import React from 'react';
import MuiDrawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/material/List';
import HouseIcon from '@mui/icons-material/House';
import InfoIcon from '@mui/icons-material/Info';
import CallIcon from '@mui/icons-material/Call';
import { useNavigate } from 'react-router-dom';

function Drawer() {
  const navigate = useNavigate(); // Get the navigate function

  const listItem = [
    {
      text: 'Home',
      icon: <HouseIcon />,
      route: '/' // Specify the route to navigate to
    },
    {
      text: 'About',
      icon: <InfoIcon />,
      route: '/about' // Specify the route to navigate to
    },
    {
      text: 'Contact',
      icon: <CallIcon />,
      route: '/contact' // Specify the route to navigate to
    }
  ];

  const handleRouter = (route) => {
    navigate(route); // Use navigate to change the route
  };

  return (
    <MuiDrawer variant='permanent' className="w-20">
      <List>
        {listItem.map((item, index) => {
          const { text, icon, route } = item;
          return (
            <ListItem key={text} onClick={() => handleRouter(route)}>
              <ListItemButton>
                <ListItemIcon>{icon}</ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </MuiDrawer>
  );
}

export default Drawer;
