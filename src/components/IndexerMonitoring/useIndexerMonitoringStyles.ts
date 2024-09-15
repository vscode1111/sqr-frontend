import { makeStyles } from 'tss-react/mui';

export const useIndexerMonitoringStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    width: '100%',
    height: '100%',
  },
  mainContainer: {
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
    gap: 10,
  },
  rightPanel: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    gap: 20,
  },
  rightPanelTop: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  rightPanelBottom: {
    display: 'flex',
    flexDirection: 'column',
    gap: 20,
  },
  hardResetButton: {
    backgroundColor: theme.colors.pink,
  },
}));
