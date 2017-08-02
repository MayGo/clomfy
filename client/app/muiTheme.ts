
import { MuiTheme, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import purple from 'material-ui/colors/purple';
import green from 'material-ui/colors/green';
import red from 'material-ui/colors/red';

const muiTheme: MuiTheme = createMuiTheme({
    fontFamily: 'Roboto, sans-serif',
    palette: createPalette({
        primary: purple,
        accent: {
            ...green,
            A400: '#00e677',
        },
        error: red,
    }),
});

export default muiTheme;
