import React from 'react'
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import NotificationsIcon from '@mui/icons-material/Notifications';
import ModeEditIcon from '@mui/icons-material/ModeEdit';
import ArchiveIcon from '@mui/icons-material/Archive';
import DeleteIcon from '@mui/icons-material/Delete';

const NavList = ({open}) => {
  const listIcons = [
    { name : 'Notes' , icon: <LightbulbIcon/>},
    { name : 'archive(avilable soon)' , icon: <ArchiveIcon/>},
    { name : 'trash(avilable soon)' , icon: <DeleteIcon/>},

  ]
  return (
    <div>
      <List>
          {listIcons.map((elem) => (
            <ListItem key={elem.name} disablePadding sx={{ display: 'block' }}>
              <ListItemButton
                sx={{
                  minHeight: 48,
                  justifyContent: open ? 'initial' : 'center',
                  px: 2.5,
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 0,
                    mr: open ? 3 : 'auto',
                    justifyContent: 'center',
                  }}
                >
                  {/* {index % 2 === 0 ? <InboxIcon /> : <MailIcon />} */}
                  {elem.icon}
                </ListItemIcon>
                <ListItemText primary={elem.name} sx={{ opacity: open ? 1 : 0 }} />
              </ListItemButton>
            </ListItem>
          ))}
        </List>
    </div>
  )
}

export default NavList
