import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { useCallback } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallbackEx, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE } from '~constants';
import { useIsLocalhost } from '~hooks';
import {
  ClaimPage,
  HomePage,
  LaunchpadPage,
  LockupPage,
  LogoutPage,
  ProfilePage,
  SharesPage,
  SignaturePage,
  StakingPage,
  TokenPage,
} from '~pages';

const CALLBACK_PATH = '/login/callback';

const oktaAuth = new OktaAuth(oktaConfig);

export function MainRouter() {
  const isLocalhost = useIsLocalhost();

  const navigate = useNavigate();

  const restoreOriginalUri = useCallback(
    (_oktaAuth: OktaAuth, originalUri: string) => {
      console.log(333, 'restoreOriginalUri');

      if (isLocalhost) {
        return;
      }

      navigate(toRelativeUrl(originalUri || '/', window.location.origin));
    },
    [isLocalhost, navigate],
  );

  return (
    <Security oktaAuth={oktaAuth} restoreOriginalUri={restoreOriginalUri}>
      <Routes>
        <Route path='/' element={<HomePage />}></Route>
        <Route element={<RequiredAuth />}>
          <Route path={`/${ROUTE.TOKEN}`} element={<TokenPage />} />
          <Route path={`/${ROUTE.CLAIM}`} element={<ClaimPage />} />
          <Route path={`/${ROUTE.LOCKUP}`} element={<LockupPage />} />
          <Route path={`/${ROUTE.STAKING}`} element={<StakingPage />} />
          <Route path={`/${ROUTE.SIGNATURE}`} element={<SignaturePage />} />
          <Route path={`/${ROUTE.LAUNCHPAD}`} element={<LaunchpadPage />} />
        </Route>
        <Route path={CALLBACK_PATH} element={<LoginCallbackEx />} />
        <Route path={`/${ROUTE.PROFILE}`} element={<ProfilePage />} />
        <Route path={`/${ROUTE.SHARES}`} element={<SharesPage />} />
        <Route path={`/${ROUTE.LOGOUT}`} element={<LogoutPage />} />
      </Routes>
    </Security>
  );
}
