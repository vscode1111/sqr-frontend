import { makeStyles } from 'tss-react/mui';

export const usePageLayoutStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
  },
  appBar: {
    marginBottom: 20,
  },
  toolbar: {
    display: 'flex',
    gap: 10,
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    height: 'calc(100vh - 20px)',
  },
}));
