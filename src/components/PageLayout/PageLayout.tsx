import { usePageLayoutStyles } from './usePageLayoutStyles';
import { AccountCircle } from '@mui/icons-material';
import { AppBar, Box, IconButton, Menu, MenuItem, Tab, Tabs, Toolbar } from '@mui/material';
import { useOktaAuth } from '@okta/okta-react';
import { ReactNode, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { uid } from 'react-uid';
import { ROUTE } from '~constants';
import { TabValue } from '~types';

const tabValueList: TabValue[] = [
  {
    label: 'Token',
    value: ROUTE.TOKEN,
  },
  {
    label: 'Claim',
    value: ROUTE.CLAIM,
  },
  {
    label: 'Lockup',
    value: ROUTE.LOCKUP,
  },
  {
    label: 'Staking',
    value: ROUTE.STAKING,
  },
  {
    label: 'Shares',
    value: ROUTE.SHARES,
  },
];

interface PageLayoutProps {
  children: ReactNode;
}

export function PageLayout({ children }: PageLayoutProps) {
  const { classes } = usePageLayoutStyles();

  const { oktaAuth } = useOktaAuth();

  const location = useLocation();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const isMenuOpen = Boolean(anchorEl);
  const [tab, setTab] = useState(location.pathname.replace('/', ''));

  const handleTabChange = (_event: React.SyntheticEvent, newValue: string) => {
    setTab(newValue);
    navigate(`/${newValue}`);
  };

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
          <Tabs value={tab} onChange={handleTabChange}>
            {tabValueList.map(({ value: route, label }) => (
              <Tab key={uid(route)} label={label} value={route} />
            ))}
          </Tabs>
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
