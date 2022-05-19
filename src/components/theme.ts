import { createTheme } from "@material-ui/core/styles"

declare module '@material-ui/core/styles/createTheme' {
  interface Theme {
    syscolor: {
      light: React.CSSProperties['color'],
      dark: React.CSSProperties['color'],
      neutral: React.CSSProperties['color'],
      semi: React.CSSProperties['color']
    }
  }
  // allow configuration using `createTheme`
  interface ThemeOptions {
    syscolor?: {
      light: React.CSSProperties['color'],
      dark: React.CSSProperties['color'],
      neutral: React.CSSProperties['color'],
      semi: React.CSSProperties['color']
    };
  }
}

declare module "@material-ui/core/styles/createBreakpoints" {
  interface BreakpointOverrides {
    ts: true;
    hl: true;
  }
}

// declare module "@material-ui/core/styles/createPalette" {
//   interface Palette {
//     neutral: Palette['primary'];
//   }
//   interface PaletteOptions {
//     neutral: PaletteOptions['primary'];
//   }
// }

const MuiTheme = createTheme({
  breakpoints: {
    values: {
      xs: 0,
      ts: 560,
      sm: 768,
      md: 1024,
      lg: 1366,
      xl: 1600,
      hl: 1880
    }
  },

  palette: {
    text: {
      primary: '#FFFFFF',
      secondary: '#AAAAAA',
      disabled: '#AAAAAA',
    },
    background: {
      default: '#222222'
    }
  },

  syscolor: {
    light: '#00FFCE',
    dark: '#0F4339',
    neutral: '#007B64',
    semi: '#2F9BE9'
  },
});

export default MuiTheme;
