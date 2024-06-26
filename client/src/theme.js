import { createTheme, getContrastRatio } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#F16122',
      light: '#FECDA6',
      dark: '#FF5B22',
      contrastText: getContrastRatio('#F16122', '#fff') > 1.5 ? '#fff' : '#222222',
    },
    secondary: {
      main: '#222222',
      light: '#FFF',
      dark: '#9C9C9C',
      contrastText: getContrastRatio('#F16122', '#fff') > 1.5 ? '#fff' : '#222222',
    },
    tertiary: {
      main: '#FFF',
      light: '#fdfdfd',
      dark: '#ededed',
      contrastText: getContrastRatio('#222222', '#fff') > 1.5 ? '#222222' : '#fff',
    },
    ochra: {
      main: '#349E46',
      light: '#228B22	',
      dark: '#2E8B57',
      contrastText: getContrastRatio('#F16122', '#fff') > 1.5 ? '#fff' : '#222222',
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  },
  breakpoints: {
    values: {
      mobile: 0,
      tablet: 768,
      laptop: 1024,
      desktop: 1200,
    },
  },
});

export default theme;
