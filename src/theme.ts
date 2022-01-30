import { createTheme } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface Theme {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
  
    interface Palette {
      neutral: Palette['primary'];
    }

    interface PaletteOptions {
      neutral: PaletteOptions['primary'];
    }
  
    interface PaletteColor {
      darker?: string;
    }
    interface SimplePaletteColorOptions {
      darker?: string;
    }
    interface ThemeOptions {
      status: {
        danger: React.CSSProperties['color'];
      };
    }
}

export const theme = createTheme({
    palette: {
        neutral: {
            main: '#616161',
            contrastText: '#fff',
        },
        warning: {
            main: '#f4ac60'
        },
        error: {
            main: '#df5455'
        },
        success: {
            main: '#52b765',
        }
    },
    status: {
        danger: 'red',
    },
  });

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    neutral: true;
  }
}