import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MaterialUITheme from './config/material-ui-theme';
import { userContext } from './contexts/UserContext';
import authService from './services/auth.service';
import { User } from './models/user.model';
import Routes from './Routes';
import SnackbarProvider from './components/SnackbarProvider';

const App: React.FC = (): JSX.Element => {
    const [user, setUser] = useState(authService.getCurrentUser());
    const userContextValue = {
        user,
        setUser: (user: User): void => {
            setUser(user);
            authService.setCurrentUser(user);
        },
    };

    return (
        <ThemeProvider theme={MaterialUITheme}>
            <SnackbarProvider
                props={{
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'right',
                    },
                }}
            >
                <userContext.Provider value={userContextValue}>
                    <Routes user={user} />
                </userContext.Provider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
