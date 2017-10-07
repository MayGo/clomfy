import { MuiThemeProvider, createMuiTheme, Theme } from 'material-ui/styles';
import purple from 'material-ui/colors/purple';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';

const muiTheme: Theme = createMuiTheme({
  palette: {
    primary: purple,
    accent: {
      ...blue,
      A400: '#00e677',
    },
    error: red,
  },
});

export default muiTheme;
