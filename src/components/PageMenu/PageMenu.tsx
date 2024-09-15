import MonitorHeartIcon from '@mui/icons-material/MonitorHeart';
import ShareIcon from '@mui/icons-material/Share';
import { Menu } from 'react-admin';

export function PageMenu() {
  return (
    <Menu>
      <Menu.Item to='/shares' primaryText='Shares' leftIcon={<ShareIcon />} />
      <Menu.Item to='/monitoring' primaryText='Monitoring' leftIcon={<MonitorHeartIcon />} />
      <Menu.ResourceItems />
    </Menu>
  );
}
