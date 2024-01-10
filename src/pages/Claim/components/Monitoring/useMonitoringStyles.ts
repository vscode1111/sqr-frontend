import { makeStyles } from 'tss-react/mui';

export const useMonitoringStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    // justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mainContaniner: {
    display: 'flex',
    justifyContent: 'space-between',
    marginTop: 30,
    width: '100%',
    gap: 30,
  },
  leftPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  leftPanelTitle: {
    display: 'flex',
    alignItems: 'center',
    // justifyContent: 'center',
    gap: 10,
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  hardResetButton: {
    backgroundColor: theme.colors.pink,
  },
}));
