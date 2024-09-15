import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { IndexerMonitoring, IndexerShares, PageLayout, TabForm } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const LockupPage = observer(() => {
  const { lockupControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Control',
        value: 'control',
        Form: () => <IndexerShares controlStore={lockupControl} />,
      },
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <IndexerMonitoring controlStore={lockupControl} />,
      },
    ],
    [lockupControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
