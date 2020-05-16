import { createMuiTheme } from '@material-ui/core/styles';
import pink from '@material-ui/core/colors/pink';
import grey from '@material-ui/core/colors/grey';
import { spacing } from '../assets/styles';

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
        MuiChip: {
            root: {
                borderRadius: '4px',
                border: `1px dashed ${pink['A400']}`,
                backgroundColor: 'inherit',
                padding: spacing[1],
                height: 'none',
            },
            label: {
                whiteSpace: 'break-spaces',
                textAlign: 'left',
            },
            deleteIcon: {
                color: grey[400],
            },
        },
    },
});

export default MaterialUITheme;
