import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Languages
import en from './languages/en';
import vi from './languages/vi';

i18n.use(initReactI18next).init({
    lng: 'vi',
    fallbackLng: 'vi',
    resources: {
        en: {
            translation: en,
        },
        vi: {
            translation: vi,
        },
    },
    interpolation: {
        escapeValue: false,
    },
});

export default i18n;
