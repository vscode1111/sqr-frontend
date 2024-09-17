import { RaApp } from './RaApp';
import { MainRouter } from './routers';
import { mainTheme } from './themes';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { configure } from 'mobx';

configure({
  enforceActions: 'never',
});

const IS_RA = true;

export function App() {
  return (
    <ThemeProvider theme={mainTheme}>
      <CssBaseline />
      {IS_RA ? <RaApp /> : <MainRouter />}
    </ThemeProvider>
  );
}
