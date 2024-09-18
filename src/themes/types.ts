import {
  Components,
  ComponentsOverrides,
  ComponentsProps,
  ComponentsVariants,
  ThemeOptions as MuiThemeOptions,
  Theme,
  ThemeOptions,
} from '@mui/material';

export type ComponentsTheme = {
  [key: string]: any;
};

export interface RaThemeOptions extends MuiThemeOptions {
  sidebar?: {
    width?: number;
    closedWidth?: number;
  };
  components?: ComponentsTheme;
}

export type ThemeType = 'light' | 'dark';

export interface CustomThemeOptions extends ThemeOptions {
  sidebar?: {
    width?: number;
    closedWidth?: number;
  };
  components?: Components<Omit<Theme, 'components'>> & {
    RaMenuItemLink?: {
      defaultProps?: ComponentsProps['MuiMenuItem'];
      styleOverrides?: ComponentsOverrides<Theme>['MuiMenuItem'];
      variants?: ComponentsVariants<Theme>['MuiMenuItem'];
    };
  };
}
