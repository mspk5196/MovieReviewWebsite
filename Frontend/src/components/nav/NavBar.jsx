import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import Drawer from '@mui/material/Drawer';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import MenuIcon from '@mui/icons-material/Menu';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';

import UserDetails from '../UserDetails/UserDetails';

const drawerWidth = 240;

function NavBar(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const navigate = useNavigate();

  const { isAuth, role } = UserDetails();

  const handleDrawerToggle = () => {
    setMobileOpen((prevState) => !prevState);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center', backgroundColor: 'rgb(224, 233, 238)', color: 'white' }}>
      <Typography variant="h6" sx={{ my: 2}}>
        <Button sx={{ fontFamily: 'cursive', fontSize: '30px', color:'white',"&:visited":{backgroundColor:'transparent',color:'white'} }} onClick={()=>navigate('/')}>Movie Review</Button>
      </Typography>
      <Divider />
      {role==='Admin' ? (
      <List>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={() => navigate('/')}>
            <ListItemText primary="Add or Remove Movies/Shows" />
          </ListItemButton>
        </ListItem>
        <ListItem disablePadding sx={{ display: 'block' }}>
          <ListItemButton onClick={() => navigate('/admin/users')}>
            <ListItemText primary="Users" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <Button onClick={() => navigate('/Profile')} sx={{ color: 'white', marginRight: '20px', backgroundColor: 'rgb(0, 140, 255)' }} variant='contained'>
            <ListItemText primary={isAuth === false ? 'Sign In' : 'Profile'} />
          </Button>
        </ListItem>
      </List>
      ) : (
      <List>
        <ListItem>
          <Button onClick={() => navigate('/')} sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)' } }}>
            <ListItemText primary="Home" />
          </Button>
        </ListItem>
        <ListItem>
          <Button onClick={() => navigate('/user/favorite')} sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)' } }}>
            <ListItemText primary="Favourites" />
          </Button>
        </ListItem>
        {/* <ListItem>
          <Button onClick={() => navigate('/contact')} sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)' } }}>
            <ListItemText primary="Contact" />
          </Button>
        </ListItem> */}
        <ListItem>
          <Button onClick={() => navigate(isAuth?'/Profile':'/SignIn')} sx={{ color: 'white', marginRight: '20px', backgroundColor: 'rgb(0, 140, 255)' }} variant='contained'>
            <ListItemText primary={isAuth === false ? 'Sign In' : 'Profile'} />
          </Button>
        </ListItem>
      </List>)}
    </Box>
  );

  const container = window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <AppBar component="nav" sx={{ backgroundColor:'rgba(255, 255, 255, 0.71)', color: 'white', boxShadow:'none' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: 'black' }}
          >
            <MenuIcon />
          </IconButton>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' }}}
          >
            <Button sx={{ fontFamily: 'fantasy', fontSize: '20px',color:'black',"&:hover":{cursor:'pointer'}}} onClick={()=>navigate('/')}>Movie Review</Button>
          </Typography>
          {role==='Admin' ? (
            <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            <Button sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)',fontFamily: 'cursive' } }} onClick={() => navigate('/')}>Add or Remove Movies/Shows</Button>
            <Button sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)',fontFamily: 'cursive' } }} onClick={() => navigate('/admin/users')}>Users</Button>
            <Button sx={{ color: 'black', marginRight: '20px', backgroundColor: 'rgb(0, 140, 255)' }} variant='contained' onClick={() => navigate('/Profile')}>{isAuth === false ? 'Sign In' : 'Profile'}</Button>
            
            </Box>
          ) : (
          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            
            <Button sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)',fontFamily: 'cursive' } }} onClick={() => navigate('/')}>Home</Button>
            <Button sx={{ color: 'black', marginRight: '20px', '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.18)',fontFamily: 'cursive' } }} onClick={() => navigate('/user/favorite')}>Favorites</Button>
            <Button sx={{ color: 'white', marginRight: '20px', backgroundColor: 'rgb(0, 140, 255)' }} variant='contained' onClick={() => navigate('/Profile')}>{isAuth === false ? 'Sign In' : 'Profile'}</Button>
          </Box>
          )}
        </Toolbar>
      </AppBar>
      <nav>
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true,
          }}
          sx={{
            display: { xs: 'block', sm: 'none' },
            '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth },
          }}
        >
          {drawer}
        </Drawer>
      </nav>
      
    </Box>
  );
}

export default NavBar;
