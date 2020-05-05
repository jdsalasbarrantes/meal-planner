import authService from '../../services/auth.service';
import { LOGIN_PAGE } from '../../constants/routes';
import {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosResponse,
    AxiosError,
} from 'axios';

/** Interceptors */
export default function (api: AxiosInstance): void {
    api.interceptors.request.use(
        (config: AxiosRequestConfig): AxiosRequestConfig => {
            const newConfig = { ...config };
            const user = authService.getCurrentUser();
            if (user) {
                newConfig.headers = {
                    'Access-Control-Allow-Headers': '*',
                    Authorization: `Bearer ${user.accessToken}`,
                };
            }
            return newConfig;
        },
        (error: AxiosError): AxiosError => error,
    );
    api.interceptors.response.use(
        (response: AxiosResponse): AxiosResponse => response,
        (error: AxiosError): AxiosError | Promise<AxiosError> => {
            if (error.response && error.response.status === 401) {
                if (authService.getCurrentUser()) {
                    authService.removeCurrentUser();
                    window.location.replace(LOGIN_PAGE);
                    return Promise.reject(error);
                }
            }
            return error;
        },
    );
}
