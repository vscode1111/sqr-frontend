import { makeStyles } from 'tss-react/mui';

export const useCopyTextStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
  },
  copy: {
    '&:hover': {
      // opacity: 0.5,
      backgroundColor: 'lightblue',
      borderRadius: 5,
    },
  },
}));
