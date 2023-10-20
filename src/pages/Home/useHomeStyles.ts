import { makeStyles } from 'tss-react/mui';

export const useHomeStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    borderRadius: 8,
    marginTop: 50,
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
    width: 150,
  },
  statusContainer: {
    display: 'flex',
    alignItems: 'center',
    width: '100%',
    gap: 20,
  },
  progress: {
    flex: 3,
  },
  info: {
    flex: 1,
    minWidth: 150,
  },
  stopContainer: {
    display: 'flex',
    width: '100%',
  },
  stopButton: {
    width: '100%',
    backgroundColor: theme.colors.red,
  },
}));
