import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Control, Monitoring, TabForm } from '~components';
import { PageLayout } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const LockupPage = observer(() => {
  const { lockupControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Control',
        value: 'control',
        Form: () => <Control controlStore={lockupControl} />,
      },
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <Monitoring controlStore={lockupControl} />,
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
