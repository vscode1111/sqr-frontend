import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Monitoring, PageLayout, TabForm } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const StakingPage = observer(() => {
  const { stakingControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <Monitoring controlStore={stakingControl} />,
      },
    ],
    [stakingControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
