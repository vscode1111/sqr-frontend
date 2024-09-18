import { useSharesPageStyles } from './useSharesPageStyles';
import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerShares } from '~components';
import { useControlStore } from '~hooks';

export const SharesPage = observer(() => {
  const { classes } = useSharesPageStyles();

  const controlStore = useControlStore();

  if (!controlStore) {
    return null;
  }

  return (
    <div className={classes.root}>
      <Title title='Shares' />
      <IndexerShares controlStore={controlStore} />
    </div>
  );
});
