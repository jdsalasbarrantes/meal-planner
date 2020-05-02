import React, { useState } from 'react';
import { ThemeProvider } from '@material-ui/core/styles';
import MaterialUITheme from './config/material-ui-theme';
import { userContext } from './contexts/UserContext';
import authService from './services/auth.service';
import { User } from './models/user.model';
import Routes from './Routes';
import SnackbarProvider from './components/SnackbarProvider';

const App: React.FC = (): JSX.Element => {
    const currentUser = authService.getCurrentUser();
    const [user, setUser] = useState(currentUser ? currentUser : null);
    const userContextValue = {
        user,
        setUser: (user: User | null): void => {
            setUser(user);
            if (user) {
                authService.setCurrentUser(user);
            } else {
                authService.removeCurrentUser();
            }
        },
    };

    return (
        <ThemeProvider theme={MaterialUITheme}>
            <SnackbarProvider
                props={{
                    autoHideDuration: 4000,
                    anchorOrigin: {
                        vertical: 'top',
                        horizontal: 'center',
                    },
                }}
            >
                <userContext.Provider value={userContextValue}>
                    <Routes user={user ? user : {}} />
                </userContext.Provider>
            </SnackbarProvider>
        </ThemeProvider>
    );
};

export default App;
