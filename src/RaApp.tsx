import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { ReactNode, useCallback, useMemo } from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallbackEx, MainLayout, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE, SUB_ROUTE } from '~constants';
import { useIsLocalhost, useStores, useTabValue } from '~hooks';
import { GenerateSharesPage, HomePage, LogoutPage, ProfilePage } from '~pages';
import { ContractCreate, ContractEdit, ContractList, MonitoringPage, SharesPage } from '~ra-pages';
import { daServer } from '~ra-services';
import { getBaseUrl } from '~services';
import { darkTheme, lightTheme } from '~themes';
import { getMainPath } from '~utils';

const viewMap: Partial<Record<string, ReactNode>> = {
  [ROUTE.GENERATE_SHARES]: <GenerateSharesPage />,
  [SUB_ROUTE.SHARES]: <SharesPage />,
  [SUB_ROUTE.MONITORING]: <MonitoringPage />,
  [SUB_ROUTE.CONTRACTS]: (
    <Resource
      name={SUB_ROUTE.CONTRACTS}
      icon={DocumentScannerIcon}
      list={ContractList}
      edit={ContractEdit}
      create={ContractCreate}
    />
  ),
};

const oktaAuth = new OktaAuth(oktaConfig);

const CALLBACK_PATH = '/login/callback';

export const RaApp = observer(() => {
  const isLocalhost = useIsLocalhost();
  const navigate = useNavigate();

  const restoreOriginalUri = useCallback(
    (_oktaAuth: OktaAuth, originalUri: string) => {
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
        <Route path='/' element={<HomePage />} />
        <Route element={<RequiredAuth />}>
          <Route path={getMainPath(ROUTE.TOKEN)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.CLAIM)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.LOCKUP)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.STAKING)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.SIGNATURE)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.LAUNCHPAD)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.GENERATE_SHARES)} element={<RaContent />} />
        </Route>
        <Route path={CALLBACK_PATH} element={<LoginCallbackEx />} />
        <Route path={`/${ROUTE.PROFILE}`} element={<ProfilePage />} />
        {/* <Route path={`/${ROUTE.SHARES}`} element={<SharesPage />} /> */}
        <Route path={`/${ROUTE.LOGOUT}`} element={<LogoutPage />} />
      </Routes>
    </Security>
  );
});

export const RaContent = observer(() => {
  const {
    ui: { route },
  } = useStores();

  console.log(100, route);

  const { firstView } = useTabValue(route);

  console.log(101, route);

  const dataProvider = useMemo(() => daServer(`${getBaseUrl(route)}/db`), []);

  return (
    <Admin
      basename={`/${route}`}
      layout={MainLayout}
      dataProvider={dataProvider}
      theme={lightTheme}
      darkTheme={darkTheme}
    >
      <Resource
        name={SUB_ROUTE.CONTRACTS}
        icon={DocumentScannerIcon}
        list={ContractList}
        edit={ContractEdit}
        create={ContractCreate}
      />
      <CustomRoutes>
        <Route path={`/`} element={viewMap[firstView ?? route]} />
        <Route path={SUB_ROUTE.SHARES} element={<SharesPage />} />
        <Route path={SUB_ROUTE.MONITORING} element={<MonitoringPage />} />
      </CustomRoutes>
    </Admin>
  );
});
