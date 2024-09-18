import { Box } from '@mui/material';
import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerMonitoring } from '~components';
import { useControlStore } from '~hooks';

export const MonitoringPage = observer(() => {
  const controlStore = useControlStore();

  if (!controlStore) {
    return null;
  }

  return (
    <Box>
      <Title title='Monitoring' />
      <IndexerMonitoring controlStore={controlStore} />
    </Box>
  );
});
