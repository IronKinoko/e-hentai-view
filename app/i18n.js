const NextI18Next = require('next-i18next').default
const path = require('path')
module.exports = new NextI18Next({
  otherLanguages: ['zh', 'th'],
  strictMode: false,
  localePath:
    typeof window === 'undefined'
      ? path.resolve('./app/public/static/locales')
      : '/static/locales',
  keySeparator: false,
})
