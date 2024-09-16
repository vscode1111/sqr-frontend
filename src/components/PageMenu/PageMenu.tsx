import DocumentScannerIcon from '@mui/icons-material/DocumentScanner';
import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ShareIcon from '@mui/icons-material/Share';
import { observer } from 'mobx-react';
import { Menu } from 'react-admin';
import { SUB_ROUTE } from '~constants';
import { useStores, useTabValue } from '~hooks';

export const PageMenu = observer(() => {
  const {
    ui: { route },
  } = useStores();

  const { currentTabValue } = useTabValue(route);

  if (!currentTabValue?.subMenus) {
    return null;
  }

  const {
    subMenus: { shares, monitoring, contracts },
  } = currentTabValue;

  return (
    <Menu>
      {shares && (
        <Menu.Item
          to={`/${route}/${SUB_ROUTE.SHARES}`}
          primaryText='Shares'
          leftIcon={<ShareIcon />}
        />
      )}
      {monitoring && (
        <Menu.Item
          to={`/${route}/${SUB_ROUTE.MONITORING}`}
          primaryText='Monitoring'
          leftIcon={<MonitorHeartIcon />}
        />
      )}
      {contracts && (
        <Menu.Item
          to={`/${route}/${SUB_ROUTE.CONTRACTS}`}
          primaryText='Contracts'
          leftIcon={<DocumentScannerIcon />}
        />
      )}

      {/* <Menu.ResourceItems /> */}
    </Menu>
  );
});
