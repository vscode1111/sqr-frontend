import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { Monitoring, TabForm } from '~components';
import { PageLayout } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const TokenPage = observer(() => {
  const { tokenControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <Monitoring controlStore={tokenControl} />,
      },
    ],
    [tokenControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
