import React, { useState } from 'react';
import CredentialsForm from '../components/CredentialsForm';
import TabPanel from '../components/TabPanel';
import _isEmpty from 'lodash/isEmpty';
import Grid from '@material-ui/core/Grid';
import { AuthCredentials } from '../models/auth-credentials.model';
import { User } from '../models/user.model';
import authService from '../services/auth.service';
import { userContext, UserContextProps } from '../contexts/UserContext';
import { useStyles } from '../assets/styles';
import { useSnackbar } from '../contexts/SnackbarContext';
import { useHistory } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import * as routes from '../constants/routes';

const LogInPage: React.FC = (): JSX.Element => {
    const classes = useStyles();
    const snackbar = useSnackbar();
    const history = useHistory();
    const { t } = useTranslation();
    const [tab, setTab] = useState(0);

    const handleSubmit = (setUser: Function, tab: number) => async (
        authCredentials: AuthCredentials,
    ): Promise<void> => {
        if (tab === 0) {
            const user: User = await authService.signIn(authCredentials);
            if (!_isEmpty(user)) {
                setUser(user);
                history.push(routes.LANDING_PAGE);
            } else {
                snackbar.showMessage(
                    t('auth:notifications.signInFailed'),
                    'error',
                );
            }
        } else if (tab === 1) {
            const success = await authService.signUp(authCredentials);
            if (success) {
                snackbar.showMessage(
                    t('auth:notifications.signedUp'),
                    'success',
                );
                setTab(0);
            } else {
                snackbar.showMessage(
                    t('auth:notifications.signedUpFailed'),
                    'error',
                );
            }
        }
    };
    return (
        <userContext.Consumer>
            {({ setUser }: UserContextProps): JSX.Element => (
                <Grid container justify="center">
                    <Grid item xs={12} md={5} lg={3}>
                        <Grid item className={classes.mb5}>
                            <TabPanel
                                tabLabels={[t('auth:signIn'), t('auth:signUp')]}
                                currentTabIndex={tab}
                                setTabIndex={setTab}
                            />
                        </Grid>
                        <Grid item className={classes.px3}>
                            <CredentialsForm
                                onSubmit={handleSubmit(setUser, tab)}
                                submitButtonLabel={
                                    tab === 0
                                        ? t('auth:signIn')
                                        : t('auth:signUp')
                                }
                            />
                        </Grid>
                    </Grid>
                </Grid>
            )}
        </userContext.Consumer>
    );
};

LogInPage.propTypes = {};

export default LogInPage;
