import { useHomeStyles } from './useHomeStyles';
import { useStores } from '@/hooks';
import { Button, LinearProgress, TextField, Typography } from '@mui/material';
import { observer } from 'mobx-react';
import { useMemo, useState } from 'react';

export const Home = observer(() => {
  const { classes } = useHomeStyles();
  const { control } = useStores();
  const { securityStatus } = control;
  const { status, sharesCount, sharesThreshold } = securityStatus;

  const sendDisabled = useMemo(
    () => sharesCount >= sharesThreshold,
    [sharesCount, sharesThreshold],
  );
  const stopDisabled = useMemo(() => sharesCount <= 0, [sharesCount]);

  const [share, setShare] = useState('');

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
          />
          <Button
            className={classes.sendButton}
            disabled={sendDisabled}
            onClick={async () => {
              await control.sendSecurityShare(share);
              setShare('');
            }}
          >
            Send
          </Button>
        </div>
        <div className={classes.statusContainer}>
          <LinearProgress
            className={classes.progress}
            variant='determinate'
            value={Math.round((100 / sharesThreshold) * sharesCount)}
          />
          <Typography className={classes.info} variant='h4'>
            {status}: {sharesCount}/{sharesThreshold}
          </Typography>
        </div>
        <div className={classes.stopContainer}>
          <Button
            className={classes.stopButton}
            disabled={stopDisabled}
            onClick={() => control.stopSecurity()}
          >
            Stop
          </Button>
        </div>
      </div>
    </div>
  );
});
