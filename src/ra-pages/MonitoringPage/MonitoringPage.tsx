import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerMonitoring, PageLayout } from '~components';
import { useControlStore } from '~hooks';

export const MonitoringPage = observer(() => {
  const controlStore = useControlStore();

  if (!controlStore) {
    return null;
  }

  return (
    <PageLayout>
      <Title title='Monitoring' />
      <IndexerMonitoring controlStore={controlStore} />
    </PageLayout>
  );
});
