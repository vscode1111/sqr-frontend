import { useTheme } from '@mui/material';
import { useMemo } from 'react';

export function useThemeMode() {
  const theme = useTheme();

  const isLightMode = useMemo(() => {
    return {
      isLightMode: theme.palette.mode === 'light',
      isDarkMode: theme.palette.mode === 'dark',
    };
  }, [theme]);

  return isLightMode;
}
