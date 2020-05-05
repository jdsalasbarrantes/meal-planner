import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';

const MaterialUITheme = createMuiTheme({
    palette: {
        primary: {
            ...pink,
            main: pink['A400'],
        },
    },
    overrides: {
        MuiTableCell: {
            head: {
                fontWeight: 'bold',
                textAlign: 'center',
            },
            body: {
                textAlign: 'center',
            },
        },
    },
});

export default MaterialUITheme;
