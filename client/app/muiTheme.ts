import { MuiTheme, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import purple from 'material-ui/colors/purple';
import blue from 'material-ui/colors/blue';
import red from 'material-ui/colors/red';

const muiTheme: MuiTheme = createMuiTheme({
  fontFamily: 'Roboto, sans-serif',
  palette: createPalette({
    primary: purple,
    accent: {
      ...blue,
      A400: '#00e677',
    },
    error: red,
  }),
});

export default muiTheme;
