import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import en from './locales/en';
import userService from './services/auth.service';

i18n.use(initReactI18next).init({
    lng: 'en',
    fallbackLng: 'en',
    debug: true,
    resources: {
        en,
    },
    interpolation: {
        escapeValue: false, // not needed for react as it escapes by default,
        format: (value: string, format?: string, lng?: string): string => {
            let result = `${value}`;
            if (format === 'currency') {
                const user = userService.getCurrentUser();
                if (user) {
                    result =
                        value === null
                            ? '-'
                            : new Intl.NumberFormat(lng, {
                                  style: 'currency',
                                  currency: user.currency,
                              }).format(parseInt(value));
                }
            }
            return result;
        },
    },
});
