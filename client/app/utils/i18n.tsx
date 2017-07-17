import * as i18n from 'i18next';

import * as enTranslation from '../locales/en/translation.json';

export const i18nInstance = i18n
  .init({
    lng: 'en',
    fallbackLng: 'en',
    resources: {
      en: {
        translation: enTranslation,
      }
    },
    debug: true,
    
    interpolation: {
      escapeValue: false, // not needed for react!!
      formatSeparator: ',',
      format: function (value, format, lng) {
        if (format === 'uppercase') return value.toUpperCase();
        return value;
      }
    }
  });
