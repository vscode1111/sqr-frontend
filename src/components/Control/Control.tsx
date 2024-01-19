import { SecurityStatus } from '..';
import { useControlStyles } from './useHomeStyles';
import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { Loader } from '~components';
import { useInitEffect } from '~hooks';
import { ControlStoreProps } from '~types';

interface ControlProps extends ControlStoreProps {}

export const Control = observer(({ controlStore }: ControlProps) => {
  const { classes } = useControlStyles();
  const { securityStatus, sendActionStatus, stopActionStatus } = controlStore;
  const { sharesCount, sharesThreshold } = securityStatus;

  useInitEffect(() => {
    controlStore.fetchingStatus = true;

    return () => {
      controlStore.fetchingStatus = false;
    };
  });

  const sendDisabled = useMemo(
    () => sharesCount >= sharesThreshold,
    [sharesCount, sharesThreshold],
  );
  const stopDisabled = useMemo(() => sharesCount <= -1, [sharesCount]);

  const [share, setShare] = useState('');

  const handleSend = useCallback(async () => {
    await controlStore.sendSecurityShare(share);
    setShare('');
  }, [share, controlStore, setShare]);

  return (
    <div className={classes.root}>
      <div className={classes.mainContaniner}>
        <div className={classes.inputContainer}>
          <TextField
            className={classes.shareInput}
            disabled={sendDisabled}
            label='Share'
            value={share}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
              setShare(event.target.value);
            }}
            onKeyDown={async (e) => {
              if (e.key === 'Enter') {
                await handleSend();
              }
            }}
          />
          <Button
            variant='contained'
            className={classes.sendButton}
            disabled={sendDisabled}
            onClick={handleSend}
          >
            <Loader
              size={20}
              style={{ visibility: sendActionStatus === 'fetching' ? 'visible' : 'hidden' }}
            />
            Send
            <Loader size={20} style={{ visibility: 'hidden' }} />
          </Button>
        </div>
        <div className={classes.statusContainer}>
          <SecurityStatus />
        </div>
        <div className={classes.stopContainer}>
          <Button
            className={classes.stopButton}
            variant='contained'
            disabled={stopDisabled}
            onClick={() => controlStore.stopSecurity()}
          >
            <Loader
              size={20}
              style={{ visibility: stopActionStatus === 'fetching' ? 'visible' : 'hidden' }}
            />
            Stop
            <Loader size={20} style={{ visibility: 'hidden' }} />
          </Button>
        </div>
      </div>
    </div>
  );
});
