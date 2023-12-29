import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE } from '~constants';
import { Control, Logout, Profile } from '~pages';

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
        <Route path='/'>
          <Route path='/profile' element={<Profile />} />
          <Route path={CALLBACK_PATH} element={<LoginCallback loadingElement={<Loading />} />} />
          <Route path={`/${ROUTE.CONTROL}`} element={<Control />} />
          <Route path={`/logout`} element={<Logout />} />
          <Route path='/protected' element={<RequiredAuth />}>
            <Route path='' element={<Control />} />
          </Route>
        </Route>
      </Routes>
    </Security>
  );
}
