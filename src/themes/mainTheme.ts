import { createTheme } from '@mui/material/styles';
import { COLORS, TRANSITION } from '~constants';
import { globalStyles } from './globalStyles';

const baseTheme = createTheme({
  colors: COLORS,
  typography: {
    fontFamily: [
      'Galano Grotesque',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    allVariants: {
      color: COLORS.black,
    },
  },

  breakpoints: {
    values: {
      xs: 0,
      sm: 600,
      md: 820,
      lg: 1440,
      xl: 1920,
    },
  },
});

export const theme = createTheme(baseTheme, {
  components: {
    MuiCssBaseline: {
      styleOverrides: globalStyles,
    },

    MuiTypography: {
      styleOverrides: {
        h1: {
          fontWeight: 500,
          fontSize: 70,
          lineHeight: '84px',
        },
        h2: {
          fontWeight: 500,
          fontSize: 50,
          lineHeight: '60px',
        },
        h3: {
          fontWeight: 500,
          fontSize: 34,
          lineHeight: '48px',
        },
        h4: {
          fontWeight: 500,
          fontSize: 22,
          lineHeight: '40px',
        },
        h5: {
          fontWeight: 500,
          fontSize: 18,
          lineHeight: '18px',
        },
        h6: {
          fontWeight: 500,
          fontSize: 16,
          lineHeight: '19.2px',
        },
        subtitle1: {
          fontWeight: 500,
          fontSize: 14,
          lineHeight: '16.8px',
        },
        body1: {
          fontWeight: 300,
          fontSize: 16,
          lineHeight: '28.8px',
        },
      },
    },

    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },

      styleOverrides: {
        root: {
          display: 'flex',
          gap: '12px',
          width: 200,
          height: 53,
          fontSize: 16,
          fontWeight: 600,
          backgroundColor: COLORS.blue,
          color: COLORS.white,
          textTransform: 'initial',
          transition: TRANSITION,
          border: '1px solid transparent',
          borderRadius: 38,
          padding: '0px 0px',
          '& > span': {
            marginTop: 3,
          },
          '&:hover': {
            backgroundColor: COLORS.gray1,
            border: '1px solid transparent',
            opacity: 0.5,
          },
          '&:disabled': {
            color: COLORS.white,
            opacity: 0.5,
          },
        },

        text: {
          width: 'fit-content',
          backgroundColor: 'transparent',
          border: '1px solid transparent',
          borderRadius: 0,
          '&:disabled': {
            borderBottom: `1px solid transparent`,
          },
          '&:hover': {
            backgroundColor: 'transparent',
            border: '1px solid transparent',
            opacity: 0.5,
          },
        },

        outlined: {
          color: COLORS.black,
          borderBottom: `1px solid ${COLORS.black}`,
          '&:hover': {
            opacity: 1,
            color: COLORS.pink,
            border: 'unset',
            borderBottom: `1px solid ${COLORS.pink}`,
            '& > svg': {
              color: COLORS.black,
            },
          },
          '&:disabled': {
            opacity: 1,
            backgroundColor: 'transparent',
          },
        },

        sizeSmall: {
          fontSize: 13,
          height: 50,
          width: 32,
          minWidth: 32,
        },

        sizeMedium: {
          fontSize: 20,
          height: 56,
        },

        sizeLarge: {
          fontSize: 16,
          height: 50,
        },
      },

      variants: [
        {
          props: { size: 'tiny' },
          style: {
            fontSize: 14,
            borderRadius: 20,
            paddingTop: 7,
            paddingBottom: 7,
            paddingLeft: 14,
            paddingRight: 14,
            height: 28,
            minWidth: 80,
          },
        },
      ],
    },

    MuiInputLabel: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            color: COLORS.blue,
          },
        },
      },
    },

    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          '&.Mui-focused': {
            // borderRadius: 10,
          },
          '&.Mui-disabled': {
            // opacity: 1,
            backgroundColor: COLORS.gray2,
          },
        },
        input: {
          // padding: '20px',
        },
        notchedOutline: {
          borderColor: `${COLORS.blue} !important`,
        },
      },
    },

    MuiDrawer: {
      styleOverrides: {
        paper: {
          width: '100%',
          color: COLORS.white,
          backgroundColor: COLORS.gray0,
        },
      },
    },

    // MuiModal: {
    //   styleOverrides: {
    //     root: {
    //       top: '50%',
    //       left: '0',
    //       transform: 'translate(0, -50%)',
    //     },
    //   },
    // },

    MuiCircularProgress: {
      styleOverrides: {
        root: {
          color: COLORS.white,
        },
      },
    },

    MuiLinearProgress: {
      styleOverrides: {
        root: {
          height: 45,
          backgroundColor: COLORS.gray1,
          // border: `1px solid ${COLORS.blue}`,
          // borderRadius: 10,
          '& .MuiLinearProgress-bar': {
            backgroundColor: COLORS.blue,
          },
        },
      },
    },

    MuiTab: {
      styleOverrides: {
        root: {
          color: COLORS.white,
          fontSize: 20,
          height: 60,
          textTransform: 'none',
          '&.Mui-selected': {
            color: COLORS.white,
          },
        },
      },
    },

    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: COLORS.white,
        },
      },
    },
  },
});
