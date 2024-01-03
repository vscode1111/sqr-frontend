import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { LoginCallback, Security } from '@okta/okta-react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { Loading, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { Control, Home, Logout, Profile } from '~pages';

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
          <Route path='/control' element={<RequiredAuth />}>
            <Route path='' element={<Control />} />
          </Route>
        </Route>
        <Route path='/profile' element={<Profile />} />
        <Route path={CALLBACK_PATH} element={<LoginCallback loadingElement={<Loading />} />} />
        <Route path={`/logout`} element={<Logout />} />
      </Routes>
    </Security>
  );
}
