import { observer } from 'mobx-react';
import { useMemo } from 'react';
import { IndexerMonitoring, PageLayout, TabForm } from '~components';
import { useStores } from '~hooks';
import { TabValue } from '~types';

export const SignaturePage = observer(() => {
  const { signatureControl } = useStores();

  const tabList: TabValue[] = useMemo(
    () => [
      {
        label: 'Monitoring',
        value: 'monitoring',
        Form: () => <IndexerMonitoring controlStore={signatureControl} />,
      },
    ],
    [signatureControl],
  );

  return (
    <PageLayout>
      <TabForm list={tabList} />
    </PageLayout>
  );
});
