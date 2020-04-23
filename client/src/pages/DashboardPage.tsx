import React from 'react';
import Button from '@material-ui/core/Button';
import { userContext, UserContextProps } from '../contexts/UserContext';
import { useHistory } from 'react-router-dom';

const DashboardPage: React.FC = (): JSX.Element => {
    const history = useHistory();
    const logout = (setUser: Function) => (): void => {
        setUser({});
        history.push('/');
    };
    return (
        <userContext.Consumer>
            {({ setUser }: UserContextProps): JSX.Element => (
                <Button
                    variant="contained"
                    color="primary"
                    onClick={logout(setUser)}
                >
                    {'logout'}
                </Button>
            )}
        </userContext.Consumer>
    );
};

DashboardPage.propTypes = {};

export default DashboardPage;
