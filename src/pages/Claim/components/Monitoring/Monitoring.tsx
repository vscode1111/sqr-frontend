import { useMonitoringStyles } from './useMonitoringStyles';
import { Button, Typography } from '@mui/material';
import JsonView from '@uiw/react-json-view';
import { observer } from 'mobx-react';
import { useEffect } from 'react';
import { Loader } from '~components';
import { useStores } from '~hooks';

export const Monitoring = observer(() => {
  const { classes } = useMonitoringStyles();
  const { control } = useStores();
  const {
    fetchStatus,
    serviceStats,
    serviceVersion,
    softResetActionStatus,
    hardResetActionStatus,
  } = control;

  useEffect(() => {
    control.fetchingStats = true;

    control.fetchVersion();

    return () => {
      control.fetchingStats = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className={classes.root}>
      <div className={classes.mainContaniner}>
        <div className={classes.leftPanel}>
          <div className={classes.leftPanelTitle}>
            <Typography variant='h5'>{`${serviceVersion.name} v${serviceVersion?.version}`}</Typography>{' '}
          </div>
          <div className={classes.leftPanelTitle}>
            <Typography variant='h5'>Stats</Typography>{' '}
            <Loader
              size={20}
              style={{
                visibility: fetchStatus === 'fetching' ? 'visible' : 'hidden',
                color: 'black',
              }}
            />
          </div>
          {serviceStats && <JsonView value={serviceStats ?? {}} displayDataTypes={false} />}
        </div>
        <div className={classes.rightPanel}>
          <Button variant='contained' onClick={() => control.softReset()}>
            <Loader
              size={20}
              style={{ visibility: softResetActionStatus === 'fetching' ? 'visible' : 'hidden' }}
            />
            Soft reset
            <Loader size={20} style={{ visibility: 'hidden' }} />
          </Button>
          <Button
            className={classes.hardResetButton}
            variant='contained'
            onClick={() => control.hardReset()}
          >
            <Loader
              size={20}
              style={{ visibility: hardResetActionStatus === 'fetching' ? 'visible' : 'hidden' }}
            />
            Hard reset
            <Loader size={20} style={{ visibility: 'hidden' }} />
          </Button>
        </div>
      </div>
    </div>
  );
});
