import { makeStyles } from 'tss-react/mui';

export const useShamirsStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    // height: 'calc(100vh - 20px)',
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
    flexDirection: 'column',
    gap: 21,
    marginBottom: 23,
  },
  inputRow1: {
    display: 'flex',
    width: '100%',
  },
  inputRow2: {
    display: 'flex',
    gap: 20,
  },
  input: {
    width: '100%',
  },
  buttonContainer: {
    display: 'flex',
    width: '100%',
  },
  button: {
    width: '100%',
    backgroundColor: theme.colors.pink,
  },
  shareContainer: {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    overflowX: 'auto',
    gap: 10,
    marginTop: 30,
  },
  share: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
  },
}));
