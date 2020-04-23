import { createContext, useContext } from 'react';

export interface SnackbarContextProps {
    showMessage: Function;
}

export const SnackbarContext = createContext<SnackbarContextProps>(
    {} as SnackbarContextProps,
);

export const useSnackbar = (): SnackbarContextProps => {
    return useContext(SnackbarContext);
};
