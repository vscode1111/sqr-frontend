import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { IndexerMonitoring, IndexerShares, PageLayout, TabForm } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const ClaimPage = observer(() => {
  const { claimControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Control',
        value: 'control',
        Form: () => <IndexerShares controlStore={claimControl} />,
      },
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <IndexerMonitoring controlStore={claimControl} />,
      },
    ],
    [claimControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
