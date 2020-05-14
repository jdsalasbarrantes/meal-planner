import React from 'react';
import MuiAppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import LogOutIcon from '@material-ui/icons/ExitToApp';
import TodayIcon from '@material-ui/icons/Today';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import StoreIcon from '@material-ui/icons/Store';
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
        setUser(null);
        handleRedirect(LANDING_PAGE);
    };

    return (
        <userContext.Consumer>
            {({ setUser }: UserContextProps): JSX.Element => (
                <Grid container className={classes.mb5}>
                    <MuiAppBar position="static">
                        <Toolbar disableGutters>
                            <Grid
                                container
                                wrap="nowrap"
                                justify="space-between"
                                className={classes.pl1}
                            >
                                <Grid item>
                                    <Button
                                        color="inherit"
                                        onClick={handleRedirect(LANDING_PAGE)}
                                    >
                                        <Typography
                                            className={classes.textAlignLeft}
                                        >
                                            {t('common:appName')}
                                        </Typography>
                                    </Button>
                                </Grid>
                                <Grid item>
                                    <Grid
                                        container
                                        wrap="nowrap"
                                        className={classes.fullHeight}
                                    >
                                        <Button
                                            color="inherit"
                                            onClick={handleRedirect(
                                                LANDING_PAGE,
                                            )}
                                        >
                                            <TodayIcon />
                                        </Button>
                                        <Button
                                            color="inherit"
                                            onClick={handleRedirect(
                                                RECIPES_PAGE,
                                            )}
                                        >
                                            <MenuBookIcon />
                                        </Button>
                                        <Button
                                            color="inherit"
                                            onClick={handleRedirect(
                                                PRODUCTS_PAGE,
                                            )}
                                        >
                                            <StoreIcon />
                                        </Button>
                                        <Button
                                            color="inherit"
                                            onClick={handleLogout(setUser)}
                                        >
                                            <LogOutIcon />
                                        </Button>
                                    </Grid>
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
