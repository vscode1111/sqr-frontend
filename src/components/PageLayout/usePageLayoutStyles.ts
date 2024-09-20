import { makeStyles } from 'tss-react/mui';

export const usePageLayoutStyles = makeStyles<{ short?: boolean }>()((_, props) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  children: {
    display: 'flex',
    flexDirection: 'column',
    padding: 30,
    width: '100%',
    maxWidth: props.short ? 900 : 'unset',
    height: props.short ? 'calc(100vh - 100px)' : 'unset',
  },
}));
