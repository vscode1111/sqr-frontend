import { useCallback } from 'react';
import { useUserMenu } from 'react-admin';
import { useNavigate } from 'react-router-dom';
import { ROUTE } from '~constants';
import { useStores } from './useStores';

export function useUi() {
  const { ui } = useStores();
  const userMenu = useUserMenu();
  const navigate = useNavigate();

  const navigateToRoute = useCallback(
    (route: ROUTE) => {
      ui.setRoute(route);
      navigate(`/${route}`);
      userMenu?.onClose();
    },
    [ui, userMenu, navigate],
  );

  return {
    navigateToRoute,
  };
}
