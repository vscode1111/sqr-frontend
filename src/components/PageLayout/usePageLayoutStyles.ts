import { makeStyles } from 'tss-react/mui';

export const usePageLayoutStyles = makeStyles()(() => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  appBar: {
    // marginBottom: 20,
  },
  toolbar: {
    display: 'flex',
    gap: 10,
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    paddingLeft: 50,
    paddingRight: 50,
    width: '100%',
    maxWidth: 800,
    height: 'calc(100vh - 100px)',
  },
}));
