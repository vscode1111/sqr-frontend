import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import PersonIcon from '@mui/icons-material/Person';
import { Box, ListItemIcon, ListItemText, MenuItem, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { AppBar, LoadingIndicator, TitlePortal, ToggleThemeButton, UserMenu } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabValueList } from '~configs';
import { ROUTE } from '~constants';
import { useStores, useUi } from '~hooks';

const AccountMenuItem = observer(() => {
  const { navigateToRoute } = useUi();

  const handleClick = useCallback(() => {
    navigateToRoute(ROUTE.PROFILE);
  }, [navigateToRoute]);

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <PersonIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Account</ListItemText>
    </MenuItem>
  );
});

const LogoutMenuItem = observer(() => {
  const { navigateToRoute } = useUi();

  const handleClick = useCallback(() => {
    navigateToRoute(ROUTE.LOGOUT);
  }, [navigateToRoute]);

  return (
    <MenuItem onClick={handleClick}>
      <ListItemIcon>
        <ExitToAppIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Logout</ListItemText>
    </MenuItem>
  );
});

export const MainAppBar = observer(() => {
  const { ui } = useStores();
  const navigate = useNavigate();

  const handleTabChange = useCallback(
    (_event: React.SyntheticEvent, newValue: string) => {
      navigate(`/${newValue}`);
      ui.setRoute(newValue as ROUTE);
    },
    [ui, navigate],
  );

  return (
    <AppBar
      userMenu={
        <UserMenu>
          <AccountMenuItem />
          <LogoutMenuItem />
        </UserMenu>
      }
      toolbar={
        <>
          <ToggleThemeButton />
          <LoadingIndicator />
        </>
      }
    >
      <TitlePortal sx={{ width: 150, flex: 'unset' }} />
      <Box sx={{ display: 'flex', flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Tabs value={ui.route} onChange={handleTabChange}>
          {TabValueList.map(({ value: route, label }) => (
            <Tab key={uid(route)} label={label} value={route} />
          ))}
        </Tabs>
      </Box>
    </AppBar>
  );
});
