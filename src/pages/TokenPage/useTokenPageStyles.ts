import { makeStyles } from 'tss-react/mui';

export const useTokenPageStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 21,
    marginTop: 50,
  },
}));
