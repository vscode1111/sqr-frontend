import { requestResolver } from './form-utils';
import { RequestEntity } from './types';
import { useShamirsStyles } from './useShamirsStyles';
import { getShares } from './utils';
import { Button } from '@mui/material';
import { useEffect, useMemo, useState } from 'react';
import { useForm } from 'react-hook-form';
import { P } from '~common';
import { CopyText, Loader, PageLayout, TextField } from '~components';

export function Shamirs() {
  const { classes } = useShamirsStyles();

  const [isSending, setSending] = useState(false);
  const [resultShares, setResultShares] = useState<string[]>([]);
  const hasResultShares = useMemo(() => resultShares.length > 0, [resultShares]);

  const {
    control,
    formState: { errors, isValid, isSubmitting },
    trigger,
    watch,
    handleSubmit,
  } = useForm<RequestEntity>({
    mode: 'onChange',
    defaultValues: {
      secret: 'secret text',
      shares: 5,
      threshold: 3,
    },
    resolver: requestResolver(),
  });

  const isDisabled = useMemo(() => !isValid || isSubmitting, [isValid, isSubmitting]);

  const sharesWatch = watch('shares');
  useEffect(() => {
    trigger('threshold');
  }, [sharesWatch, trigger]);

  const thresholdWatch = watch('threshold');
  useEffect(() => {
    trigger('shares');
  }, [thresholdWatch, trigger]);

  return (
    <PageLayout>
      <div className={classes.inputContainer}>
        <div className={classes.inputRow1}>
          <TextField
            className={classes.input}
            name={P<RequestEntity>((p) => p.secret) as any}
            placeholder='Your secret'
            variant='standard'
            control={control as any}
            error={!!errors.secret}
            helperText={errors.secret?.message || ' '}
          />
        </div>
        <div className={classes.inputRow2}>
          <TextField
            className={classes.input}
            name={P<RequestEntity>((p) => p.shares) as any}
            placeholder='Number of shares'
            variant='standard'
            type='number'
            control={control as any}
            error={!!errors.shares}
            helperText={errors.shares?.message || ' '}
          />
          <TextField
            className={classes.input}
            name={P<RequestEntity>((p) => p.threshold) as any}
            placeholder='Threshold value'
            variant='standard'
            type='number'
            control={control as any}
            error={!!errors.threshold}
            helperText={errors.threshold?.message || ' '}
          />
        </div>
      </div>
      <div className={classes.buttonContainer}>
        <Button
          className={classes.button}
          variant='contained'
          type='submit'
          disabled={isDisabled}
          onClick={handleSubmit(async (formValues) => {
            setSending(true);
            try {
              const { secret, shares, threshold } = formValues;
              const newShares = getShares(secret, Number(shares), Number(threshold));
              setResultShares(newShares);
            } catch (e) {
              console.log(e);
            }
            setSending(false);
          })}
        >
          Generate shares
        </Button>
        {isSending && <Loader size={20} />}
      </div>
      {hasResultShares && (
        <div className={classes.shareContainer}>
          {resultShares.map((share) => (
            <CopyText key={`share_${share}`} className={classes.share} text={share} />
          ))}
        </div>
      )}
    </PageLayout>
  );
}
