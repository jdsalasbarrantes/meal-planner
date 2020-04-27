import api from '../config/axios/axios-instance';
import StorageService from './storage.service';
import { AuthCredentials } from '../models/auth-credentials.model';
import { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import { User } from '../models/user.model';

class AuthService {
    static async signIn(authCredentials: AuthCredentials): Promise<User> {
        try {
            const response: AxiosResponse = await api.post(
                '/auth/sign-in',
                authCredentials,
            );
            const user: User = jwtDecode(response.data.accessToken);
            user.accessToken = response.data.accessToken;
            return user;
        } catch (err) {
            return {};
        }
    }

    static async signUp(authCredentials: AuthCredentials): Promise<boolean> {
        try {
            await api.post('/auth/sign-up', authCredentials);
            return true;
        } catch (err) {
            return false;
        }
    }

    static setCurrentUser(user: User): void {
        StorageService.setItem('user', JSON.stringify(user));
    }

    static getCurrentUser(): User {
        const stringUser = StorageService.getItem('user');
        if (stringUser) {
            return JSON.parse(stringUser);
        } else {
            return {};
        }
    }
}

export default AuthService;
