import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Control, Monitoring, TabForm } from '~components';
import { PageLayout } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const ClaimPage = observer(() => {
  const { claimControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Control',
        value: 'control',
        Form: () => <Control controlStore={claimControl} />,
      },
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <Monitoring controlStore={claimControl} />,
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
