import { makeStyles } from 'tss-react/mui';

export const useHomePageStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    height: 'calc(100vh - 100px)',
  },
  mainContainer: {
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
