import { Colors } from '~constants';
import { stores } from '~stores';

declare module '@mui/material/styles' {
  interface Theme {
    colors: Colors;
  }

  interface ThemeOptions {
    colors: Colors;
  }
}

declare global {
  interface Window {
    stores?: typeof stores;
    BASE_URL?: string;
  }
}
