import { toRelativeUrl } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Loading } from '~components';
import { useStores } from '~hooks';

export const RequiredAuth = observer(() => {
  const { auth } = useStores();

  const { oktaAuth, authState } = useOktaAuth();

  useEffect(() => {
    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }

    if (authState?.accessToken?.accessToken) {
      console.log(100, authState.accessToken.accessToken);
      auth.setToken(authState.accessToken.accessToken);
    }
  }, [auth, oktaAuth, authState?.isAuthenticated, authState?.accessToken?.accessToken]);

  if (!authState || !authState?.isAuthenticated) {
    return <Loading />;
  }

  return <Outlet />;
});
