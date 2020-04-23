import React, { useState, Fragment, ReactNode } from 'react';
import PropTypes from 'prop-types';
import Snackbar, { SnackbarProps } from '@material-ui/core/Snackbar';
import MuiAlert, { AlertProps, Color } from '@material-ui/lab/Alert';
import { SnackbarContext } from '../contexts/SnackbarContext';

const Alert = (props: AlertProps): JSX.Element => {
    return <MuiAlert elevation={6} variant="filled" {...props} />;
};

interface SnackbarProviderProps {
    children: ReactNode;
    props: SnackbarProps;
}

const SnackbarProvider: React.FC<SnackbarProviderProps> = ({
    children,
    props,
}): JSX.Element => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState('');
    const [severity, setSeverity] = useState<Color>('success');
    const showMessage = (message: string, severity: Color): void => {
        setOpen(true);
        setSeverity(severity);
        setMessage(message);
    };
    const handleClose = (): void => {
        setOpen(false);
    };
    const contextValue = {
        showMessage,
    };
    return (
        <Fragment>
            <SnackbarContext.Provider value={contextValue}>
                {children}
            </SnackbarContext.Provider>
            <Snackbar {...props} open={open} onClose={handleClose}>
                <Alert onClose={handleClose} severity={severity}>
                    {message || ''}
                </Alert>
            </Snackbar>
        </Fragment>
    );
};

SnackbarProvider.propTypes = {
    props: PropTypes.object.isRequired,
    children: PropTypes.node,
};

export default SnackbarProvider;
