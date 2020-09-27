const NextI18Next = require('next-i18next').default
const path = require('path')
const { localeSubpaths } = require('next/config').default().publicRuntimeConfig

module.exports = new NextI18Next({
  localeSubpaths,
  otherLanguages: ['zh', 'th', 'kr'],
  strictMode: false,
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./app/public/static/locales')
      : '/static/locales',
  keySeparator: false,
})
