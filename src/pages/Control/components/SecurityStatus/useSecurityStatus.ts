import { makeStyles } from 'tss-react/mui';

export const useSecurityStatus = makeStyles<{ color: string }>()((theme, { color }) => ({
  root: {
    display: 'flex',
  },
  progress: {
    flex: 1,
    '& .MuiLinearProgress-bar': {
      backgroundColor: color,
    },
  },
  info: {
    display: 'flex',
    gap: 10,
    alignItems: 'center',
    color: theme.colors.white,
    position: 'absolute',
    justifyContent: 'center',
    left: 'calc(50% - 150px)',
    width: 300,
  },
}));
