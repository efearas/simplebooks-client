import React from 'react';
import {createMuiTheme,ThemeProvider} from "@material-ui/core/styles";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#489C42',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2FA8AC',
      contrastText: '#fff',
    },
  },
  
  typography: {
    fontFamily: [
      'Open Sans',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    h6:{
        fontWeight: 600,
        lineHeight: '1.4',
        //opacity: 0.8,
    }
  },
});


export default function MaterialThemeProvider(props) {
  return (
    <ThemeProvider theme={theme}>
        {props.children}
    </ThemeProvider>
  );
}

 
