const pkg = require('./package.json')
const { i18n } = require('./next-i18next.config')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const nextConfig = {
  i18n,

  env: {
    VERSION: pkg.version,
    BUILDTIME: pkg.buildTime,
  },
}

module.exports = withBundleAnalyzer(nextConfig)
