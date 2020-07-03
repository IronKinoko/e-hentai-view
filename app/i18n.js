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
    lookupCookie: 'i18n',
    order: [''],
    caches: [''],
  },
})
