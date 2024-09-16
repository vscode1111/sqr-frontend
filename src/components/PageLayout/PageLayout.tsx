import { usePageLayoutStyles } from './usePageLayoutStyles';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { ReactNode, useCallback, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabValueList } from '~configs';
import { ROUTE } from '~constants';

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { classes } = usePageLayoutStyles();

  const { oktaAuth, authState } = useOktaAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [tab, setTab] = useState(location.pathname.replace('/', ''));

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      setTab(newValue);
      navigate(`/${newValue}`);
    },
    [setTab, navigate],
  );

  const handleProfileMenuOpen = useCallback(
    (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    },
    [setAnchorEl],
  );

  const handleMenuClose = useCallback(() => {
    setAnchorEl(null);
  }, [setAnchorEl]);

  const logout = useCallback(async () => {
    await oktaAuth.signOut();
  }, [oktaAuth]);

  const navigateToProfile = useCallback(() => {
    navigate(`/${ROUTE.PROFILE}`);
  }, [navigate]);

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
      <MenuItem onClick={navigateToProfile}>Profile</MenuItem>
      <MenuItem onClick={logout}>Logout</MenuItem>
    </Menu>
  );

  return (
    <div className={classes.root}>
      <AppBar className={classes.appBar} position='static'>
        <Toolbar className={classes.toolbar}>
          <Tabs value={tab} onChange={handleTabChange}>
            {TabValueList.map(({ value: route, label }) => (
              <Tab key={uid(route)} label={label} value={route} />
            ))}
          </Tabs>
          <Box sx={{ flexGrow: 1 }} />
          {authState?.isAuthenticated && (
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
          )}
        </Toolbar>
      </AppBar>
      <div className={classes.children}>{children}</div>
      {renderMenu}
    </div>
  );
}
