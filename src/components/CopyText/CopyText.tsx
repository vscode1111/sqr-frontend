import { useCopyTextStyles } from './useCopyTextStyles';
import { ContentCopy, ContentCopyTwoTone } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { HTMLAttributes, useState } from 'react';

interface CopyTextProps extends HTMLAttributes<any> {
  text: string;
}

export function CopyText({ text, ...rest }: CopyTextProps) {
  const { classes } = useCopyTextStyles();
  const [filled, setFilled] = useState(false);

  return (
    <div className={classes.root} {...rest}>
      <div
        className={classes.copy}
        onClick={() => {
          navigator.clipboard.writeText(text);
          setFilled(true);
          setTimeout(() => setFilled(false), 500);
        }}
      >
        {filled ? <ContentCopyTwoTone color='primary' /> : <ContentCopy color='primary' />}
      </div>
      <Typography>{text}</Typography>
    </div>
  );
}
