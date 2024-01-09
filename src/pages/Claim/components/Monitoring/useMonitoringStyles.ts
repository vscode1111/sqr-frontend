import { makeStyles } from 'tss-react/mui';

export const useMonitoringStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mainContaniner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    justifyContent: 'center',
    width: '100%',
  },
}));
