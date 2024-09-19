import { toRelativeUrl } from '@okta/okta-auth-js';
import { useOktaAuth } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { LoadingOkta } from '~components';
import { useIsLocalhost, useStores } from '~hooks';

export const RequiredAuth = observer(() => {
  const { auth } = useStores();

  const { oktaAuth, authState } = useOktaAuth();

  const isLocalhost = useIsLocalhost();

  useEffect(() => {
    if (isLocalhost) {
      return;
    }

    if (!authState?.isAuthenticated) {
      const originalUri = toRelativeUrl(window.location.href, window.location.origin);
      oktaAuth.setOriginalUri(originalUri);
      oktaAuth.signInWithRedirect();
    }

    if (authState?.accessToken?.accessToken) {
      auth.setToken(authState.accessToken.accessToken);
    }
  }, [
    isLocalhost,
    auth,
    oktaAuth,
    authState?.isAuthenticated,
    authState?.accessToken?.accessToken,
  ]);

  if (isLocalhost) {
    return <Outlet />;
  }

  if (!authState || !authState?.isAuthenticated) {
    return <LoadingOkta />;
  }

  return <Outlet />;
});
