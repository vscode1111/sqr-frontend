import MUITextField from '@mui/material/TextField';
import { TextFieldProps as MUITextFieldProps } from '@mui/material/TextField/TextField';
import Typography from '@mui/material/Typography';
import React, { forwardRef } from 'react';
import { makeStyles } from 'tss-react/mui';

export interface TextFieldProps extends Omit<MUITextFieldProps, 'label'> {
  label?: string;
  additionalLabel?: string;
  defaultValue?: string;
  additionalLabelOnClick?: () => void;
}

function TextFieldComponent(
  { label, additionalLabel, additionalLabelOnClick, ...props }: TextFieldProps,
  ref: React.ForwardedRef<HTMLInputElement>,
) {
  const { classes, cx } = useStyles();

  return (
    <div className={classes.root}>
      {(label || additionalLabel) && (
        <div className={classes.info}>
          <Typography variant='body2'>{label}</Typography>
          <Typography
            variant='subtitle2'
            className={cx(
              classes.additionalLabel,
              additionalLabelOnClick && classes.additionalLabelActive,
            )}
            onClick={additionalLabelOnClick}
          >
            {additionalLabel}
          </Typography>
        </div>
      )}

      <MUITextField {...props} ref={ref} />
    </div>
  );
}

export const TextFieldInternal = forwardRef(TextFieldComponent);

const useStyles = makeStyles()(() => ({
  root: {
    // display: 'flex',
    // flexDirection: 'column',
    width: '100%',
  },
  info: {
    // display: 'flex',
    // alignItems: 'center',
    // justifyContent: 'space-between',
    // marginBottom: 12,
  },
  additionalLabel: {
    // color: theme.colors.black,
    // transition: TRANSITION,
    // '& > span > span': {
    //   color: theme.colors.green,
    // },
  },
  additionalLabelActive: {
    // cursor: 'pointer',
    // '&:hover': {
    //   opacity: 1,
    // },
  },
}));
