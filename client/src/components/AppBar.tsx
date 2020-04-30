import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { useTranslation } from 'react-i18next';
import { useHistory } from 'react-router-dom';
import { useStyles } from '../assets/styles';
import { userContext, UserContextProps } from '../contexts/UserContext';
import { LANDING_PAGE, RECIPES_PAGE, PRODUCTS_PAGE } from '../constants/routes';

const AppBar: React.FC = (): JSX.Element => {
    const history = useHistory();
    const classes = useStyles();
    const { t } = useTranslation();

    const handleRedirect = (route: string) => (): void => {
        history.push(route);
    };

    const handleLogout = (setUser: Function) => (): void => {
        setUser({});
        handleRedirect(LANDING_PAGE);
    };

    return (
        <userContext.Consumer>
            {({ setUser }: UserContextProps): JSX.Element => (
                <Grid container className={classes.mb5}>
                    <MuiAppBar position="static">
                        <Toolbar>
                            <Grid
                                container
                                justify="space-between"
                                wrap="nowrap"
                            >
                                <Button
                                    color="inherit"
                                    onClick={handleRedirect(LANDING_PAGE)}
                                >
                                    <Typography variant="h6">
                                        {t('common:appName')}
                                    </Typography>
                                </Button>
                                <Grid>
                                    <Button
                                        color="inherit"
                                        onClick={handleRedirect(RECIPES_PAGE)}
                                    >
                                        {t('common:recipes')}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        onClick={handleRedirect(PRODUCTS_PAGE)}
                                    >
                                        {t('common:products')}
                                    </Button>
                                    <Button
                                        color="inherit"
                                        className={classes.ml9}
                                        onClick={handleLogout(setUser)}
                                    >
                                        {t('auth:logOut')}
                                    </Button>
                                </Grid>
                            </Grid>
                        </Toolbar>
                    </MuiAppBar>
                </Grid>
            )}
        </userContext.Consumer>
    );
};

export default AppBar;
