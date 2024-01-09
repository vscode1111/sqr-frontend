import { makeStyles } from 'tss-react/mui';

export const useSharesStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    gap: 21,
    marginTop: 50,
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
