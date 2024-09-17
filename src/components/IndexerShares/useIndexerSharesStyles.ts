import { makeStyles } from 'tss-react/mui';

export const useIndexerSharesStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
  },
  mainContainer: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: 30,
    justifyContent: 'center',
    width: '100%',
  },
  inputContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  shareInput: {
    width: '100%',
  },
  sendButton: {
    width: 180,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    gap: 20,
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
