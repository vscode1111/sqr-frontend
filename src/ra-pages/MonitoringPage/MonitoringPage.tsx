import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerMonitoring } from '~components';
import { useStores } from '~hooks';

export const MonitoringPage = observer(() => {
  const { launchpadControl: controlStore } = useStores();

  return (
    <Box>
      <Title title='Shares' />
      <IndexerMonitoring controlStore={controlStore} />
    </Box>
  );
});
