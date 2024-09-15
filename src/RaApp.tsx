import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import { Admin, CustomRoutes, Resource } from 'react-admin';
import { Route } from 'react-router-dom';
import { MainLayout } from '~components';
import { ContractCreate, ContractEdit, ContractList, SharesPage } from '~ra-pages';
import { MonitoringPage } from '~ra-pages/MonitoringPage';
import { daServer } from '~ra-services';

export function RaApp() {
  return (
    <Admin layout={MainLayout} dataProvider={daServer('http://localhost:3000/db')}>
      <Resource
        name={'contracts'}
        icon={DocumentScannerIcon}
        list={ContractList}
        edit={ContractEdit}
        create={ContractCreate}
      />
      <CustomRoutes>
        <Route path={'/shares'} element={<SharesPage />} />
        <Route path={'/monitoring'} element={<MonitoringPage />} />
      </CustomRoutes>
    </Admin>
  );
}
