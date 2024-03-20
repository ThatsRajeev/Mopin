import { createTheme, getContrastRatio } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochra: {
      main: '#F16122',
      light: '#FECDA6',
      dark: '#F16122',
      contrastText: getContrastRatio('#F16122', '#fff') > 1.5 ? '#fff' : '#222222',
    },
  },
});

export default theme;
