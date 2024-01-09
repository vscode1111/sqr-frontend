import { MainRouter } from './routers';
import { theme } from './themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <MainRouter />
    </ThemeProvider>
  );
}
