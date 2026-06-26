import { AppBar, Box, Button, IconButton, Toolbar, Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import LogoutIcon from '@mui/icons-material/Logout';

export default function PageBar({ user, onLogout }) {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h5">Blog app</Typography>
        <Box sx={{ flexGrow: 1 }} />
        <Button component={Link} to="/" color='inherit'>blogs</Button>
        {user && <Button component={Link} to="/new_blog" color='inherit'>new blog</Button>}
        <Box sx={{ width: 30 }} />
        {user
          ? <>
            <Typography>{user.username}</Typography>
            <IconButton color='inherit' onClick={onLogout}>
              <LogoutIcon />
            </IconButton>
          </>
          : <Button component={Link} to="/login" color='inherit'>log in</Button>}
      </Toolbar>
    </AppBar>
  );
}
