import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { OktaAuth, toRelativeUrl } from '@okta/okta-auth-js';
import { Security } from '@okta/okta-react';
import { observer } from 'mobx-react';
import { ReactNode, useCallback, useEffect, useMemo } from 'react';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { LoginCallbackEx, MainLayout, RequiredAuth } from '~components';
import { oktaConfig } from '~configs';
import { ROUTE, SUB_ROUTE } from '~constants';
import { useIsLocalhost, usePathnames, useStores, useTabValue } from '~hooks';
import { GenerateSharesPage, HomePage, LogoutPage, ProfilePage } from '~pages';
import { ContractCreate, ContractEdit, ContractList, MonitoringPage, SharesPage } from '~ra-pages';
import { daServer } from '~ra-services';
import { getBaseUrl } from '~services';
import { darkTheme, lightTheme } from '~themes';
import { getMainPath } from '~utils';

const viewMap: Partial<Record<string, ReactNode>> = {
  [ROUTE.GENERATE_SHARES]: <GenerateSharesPage />,
  [ROUTE.PROFILE]: <ProfilePage />,
  [ROUTE.LOGOUT]: <LogoutPage />,
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
  const { ui } = useStores();
  const isLocalhost = useIsLocalhost();
  const navigate = useNavigate();

  const { firstPathname } = usePathnames();

  useEffect(() => {
    ui.setRoute(firstPathname as ROUTE);
  }, [firstPathname, ui]);

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
          <Route path={getMainPath(ROUTE.PROFILE)} element={<RaContent />} />
          <Route path={getMainPath(ROUTE.LOGOUT)} element={<RaContent />} />
        </Route>
        <Route path={CALLBACK_PATH} element={<RaContent isCallbackPath />} />
      </Routes>
    </Security>
  );
});

export const RaContent = observer(({ isCallbackPath = false }: { isCallbackPath?: boolean }) => {
  const {
    ui: { route },
  } = useStores();

  const navigate = useNavigate();

  const { firstView } = useTabValue(route);
  const { secondPathname } = usePathnames();

  useEffect(() => {
    if (firstView && !secondPathname) {
      navigate(`${firstView}`);
    }
  }, [firstView, secondPathname, navigate]);

  const dataProvider = useMemo(() => daServer(`${getBaseUrl(route)}/db`), [route]);

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
        <Route
          path={`/`}
          element={isCallbackPath ? <LoginCallbackEx /> : viewMap[firstView ?? route]}
        />
        <Route path={SUB_ROUTE.SHARES} element={<SharesPage />} />
        <Route path={SUB_ROUTE.MONITORING} element={<MonitoringPage />} />
      </CustomRoutes>
    </Admin>
  );
});
