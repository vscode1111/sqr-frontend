import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallbackEx, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE } from '~constants';
import { Claim, Home, Logout, Profile, Shamirs } from '~pages';

const CALLBACK_PATH = '/login/callback';

const oktaAuth = new OktaAuth(oktaConfig);

export function MainRouter() {
  const navigate = useNavigate();
  const restoreOriginalUri = async (_oktaAuth: OktaAuth, originalUri: string) => {
    navigate(toRelativeUrl(originalUri || '/', window.location.origin));
  };

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path='/' element={<Home />}>
          <Route path={`/${ROUTE.CLAIM}`} element={<RequiredAuth />}>
            <Route path='' element={<Claim />} />
          </Route>
        </Route>
        <Route path={`/${ROUTE.PROFILE}`} element={<Profile />} />
        <Route path={CALLBACK_PATH} element={<LoginCallbackEx />} />
        <Route path={`/${ROUTE.SHARES}`} element={<Shamirs />} />
        <Route path={`/${ROUTE.LOGOUT}`} element={<Logout />} />
      </Routes>
    </Security>
  );
}
