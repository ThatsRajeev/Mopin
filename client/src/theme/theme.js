import { createTheme, getContrastRatio } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    ochra: {
      main: '#FF9130',
      light: '#FECDA6',
      dark: '#FF5B22',
      contrastText: getContrastRatio('#FF5B22', '#fff') > 1.5 ? '#fff' : '#222222',
    },
  },
});

export default theme;
