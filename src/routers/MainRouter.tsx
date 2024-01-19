import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallbackEx, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE } from '~constants';
import {
  ClaimPage,
  HomePage,
  LockupPage,
  LogoutPage,
  ProfilePage,
  SharesPage,
  TokenPage,
} from '~pages';

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
        <Route path='/' element={<HomePage />}></Route>
        <Route element={<RequiredAuth />}>
          <Route path={`/${ROUTE.TOKEN}`} element={<TokenPage />} />
          <Route path={`/${ROUTE.CLAIM}`} element={<ClaimPage />} />
          <Route path={`/${ROUTE.LOCKUP}`} element={<LockupPage />} />
        </Route>
        <Route path={CALLBACK_PATH} element={<LoginCallbackEx />} />
        <Route path={`/${ROUTE.PROFILE}`} element={<ProfilePage />} />
        <Route path={`/${ROUTE.SHARES}`} element={<SharesPage />} />
        <Route path={`/${ROUTE.LOGOUT}`} element={<LogoutPage />} />
      </Routes>
    </Security>
  );
}
