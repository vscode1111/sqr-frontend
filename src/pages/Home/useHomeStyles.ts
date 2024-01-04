import { makeStyles } from 'tss-react/mui';

export const useHomeStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 20px)',
  },
  mainContaniner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    justifyContent: 'center',
    width: '100%',
    maxWidth: 800,
  },
  stopContainer: {
    display: 'flex',
    width: '100%',
  },
  stopButton: {
    width: '100%',
    backgroundColor: theme.colors.pink,
  },
}));
