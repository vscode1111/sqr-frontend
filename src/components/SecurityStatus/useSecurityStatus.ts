import { makeStyles } from 'tss-react/mui';

export const useSecurityStatus = makeStyles<{ color: string }>()((theme, { color }) => ({
  root: {
    display: 'flex',
  },
  progress: {
    height: 36,
    flex: 1,
    '& .MuiLinearProgress-bar': {
      backgroundColor: color,
    },
  },
  info: {
    fontSize: 20,
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    color: theme.colors.white,
    position: 'absolute',
    justifyContent: 'center',
    width: 300,
  },
}));
