import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Monitoring, PageLayout, TabForm } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const LaunchpadPage = observer(() => {
  const { launchpadControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <Monitoring controlStore={launchpadControl} />,
      },
    ],
    [launchpadControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
