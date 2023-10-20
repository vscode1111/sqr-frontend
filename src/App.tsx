import { MainRouter } from './routers';
import { theme } from './themes';
import { ThemeProvider } from '@mui/material';

export function App() {
  return (
    <ThemeProvider theme={theme}>
      <MainRouter />
    </ThemeProvider>
  );
}
