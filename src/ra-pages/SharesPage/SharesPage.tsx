import { useSharesPageStyles } from './useSharesPageStyles';
import { observer } from 'mobx-react';
import { Title } from 'react-admin';
import { IndexerShares } from '~components';
import { useStores } from '~hooks';

export const SharesPage = observer(() => {
  const { classes } = useSharesPageStyles();

  const { launchpadControl: controlStore } = useStores();

  return (
    <div className={classes.root}>
      <Title title='Shares' />
      <IndexerShares controlStore={controlStore} />
    </div>
  );
});
