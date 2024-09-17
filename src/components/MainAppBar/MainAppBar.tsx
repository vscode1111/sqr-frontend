import PersonIcon from '@mui/icons-material/Person';
import { Box, ListItemIcon, ListItemText, MenuItem, Tab, Tabs } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import {
  AppBar,
  LoadingIndicator,
  Logout,
  TitlePortal,
  ToggleThemeButton,
  UserMenu,
  useUserMenu,
} from 'react-admin';
import { useLocation, useNavigate } from 'react-router-dom';
import { uid } from 'react-uid';
import { TabValueList } from '~configs';
import { ROUTE } from '~constants';
import { useInitEffect, useStores } from '~hooks';

const SettingsMenuItem = () => {
  const userMenu = useUserMenu();

  return (
    <MenuItem onClick={userMenu?.onClose}>
      <ListItemIcon>
        <PersonIcon fontSize='small' />
      </ListItemIcon>
      <ListItemText>Account</ListItemText>
    </MenuItem>
  );
};

export const MainAppBar = observer(() => {
  const { ui } = useStores();

  const location = useLocation();
  const navigate = useNavigate();

  useInitEffect(() => {
    const rootPath = location.pathname.split('/')[1];
    ui.setRoute(rootPath as ROUTE);
  });

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
          <SettingsMenuItem />
          <Logout />
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
