import { SecurityStatus } from './components';
import { useHomeStyles } from './useHomeStyles';
import { Button, TextField } from '@mui/material';
import { observer } from 'mobx-react';
import { useCallback, useMemo, useState } from 'react';
import { Loader } from '~components';
import { useStores } from '~hooks';

export const Home = observer(() => {
  const { classes } = useHomeStyles();
  const { control } = useStores();
  const { securityStatus, sendActionStatus, stopActionStatus } = control;
  const { sharesCount, sharesThreshold } = securityStatus;

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
  );
});
