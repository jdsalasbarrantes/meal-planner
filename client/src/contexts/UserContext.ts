import { createContext } from 'react';
import { User } from '../models/user.model';

export interface UserContextProps {
    user: User;
    setUser: Function;
}

export const userContext = createContext<UserContextProps>(
    {} as UserContextProps,
);
