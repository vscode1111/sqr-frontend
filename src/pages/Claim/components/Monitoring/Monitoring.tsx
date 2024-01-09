import { useMonitoringStyles } from './useMonitoringStyles';
import { observer } from 'mobx-react';
import { useStores } from '~hooks';

export const Monitoring = observer(() => {
  const { classes } = useMonitoringStyles();
  const { control } = useStores();

  return (
    <div className={classes.root}>
      <div className={classes.mainContaniner}>Monitoring</div>
    </div>
  );
});
