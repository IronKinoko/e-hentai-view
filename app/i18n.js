const NextI18Next = require('next-i18next').default
module.exports = new NextI18Next({
  defaultLanguage: 'en',
  otherLanguages: ['zh'],
  localePath:
    typeof window === 'undefined'
      ? 'app/public/static/locales'
      : 'public/static/locales',
  keySeparator: false,
  detection: {
    lookupCookie: 'next-i18next',
    order: ['cookie', 'localStorage', 'header'],
    caches: ['cookie', 'localStorage'],
  },
})
