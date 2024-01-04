import { SecurityStatus } from './components';
import { useControlStyles } from './useHomeStyles';
import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Loader, PageLayout } from '~components';
import { useStores } from '~hooks';

export const Control = observer(() => {
  const { classes } = useControlStyles();
  const { control } = useStores();
  const { securityStatus, sendActionStatus, stopActionStatus } = control;
  const { sharesCount, sharesThreshold } = securityStatus;

  useEffect(() => {
    control.startFetchingStatus();

    return () => {
      control.stopFetchingStatus();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const sendDisabled = useMemo(
    () => sharesCount >= sharesThreshold,
    [sharesCount, sharesThreshold],
  );
  const stopDisabled = useMemo(() => sharesCount <= -1, [sharesCount]);

  const [share, setShare] = useState('');

  const handleSend = useCallback(async () => {
    await control.sendSecurityShare(share);
    setShare('');
  }, [share, control, setShare]);

  return (
    <PageLayout>
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
            <Button className={classes.sendButton} disabled={sendDisabled} onClick={handleSend}>
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
              disabled={stopDisabled}
              onClick={() => control.stopSecurity()}
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
    </PageLayout>
  );
});
