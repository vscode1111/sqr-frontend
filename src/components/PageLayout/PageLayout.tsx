import { usePageLayoutStyles } from './usePageLayoutStyles';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, Button, IconButton, Menu, MenuItem, Toolbar } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { ReactNode, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '~constants';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { classes } = usePageLayoutStyles();

  const { oktaAuth } = useOktaAuth();

  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);

  const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const logout = async () => {
    await oktaAuth.signOut();
  };

  const menuId = 'primary-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={() => navigate(`/${ROUTE.PROFILE}`)}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar className={classes.toolbar}>
          <Button variant='text' onClick={() => navigate(`/${ROUTE.CONTROL}`)}>
            Control
          </Button>
          <Button variant='text' onClick={() => navigate(`/${ROUTE.SHAMIRS}`)}>
            Shamirs
          </Button>
          <Box sx={{ flexGrow: 1 }} />
          <IconButton
            size='large'
            edge='end'
            aria-label='account of current user'
            aria-controls={menuId}
            aria-haspopup='true'
            onClick={handleProfileMenuOpen}
            color='inherit'
          >
            <AccountCircle />
          </IconButton>
        </Toolbar>
      </AppBar>
      <div className={classes.children}>{children}</div>
      {renderMenu}
    </div>
  );
}
