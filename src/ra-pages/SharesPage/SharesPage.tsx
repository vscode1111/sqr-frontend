import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerShares, PageLayout } from '~components';
import { useControlStore } from '~hooks';

export const SharesPage = observer(() => {
  const controlStore = useControlStore();

  if (!controlStore) {
    return null;
  }

  return (
    <PageLayout short>
      <Title title='Shares' />
      <IndexerShares controlStore={controlStore} />
    </PageLayout>
  );
});
