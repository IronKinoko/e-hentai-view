const webpack = require('webpack')
const package = require('../package.json')
const nextOffline = require('next-offline')
const { nextI18NextRewrites } = require('next-i18next/rewrites')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})
const localeSubpaths = require('./localeSubpaths')
const nextConfig = {
  // target: 'serverless',
  // assetPrefix: isProd ? (isVercel ? '' : '/e-hentai-view') : '',
  webpack(config) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    )

    return config
  },
  rewrites: async () => nextI18NextRewrites(localeSubpaths),
  publicRuntimeConfig: {
    localeSubpaths,
  },

  // generateInDevMode: true,
  devIndicators: {
    autoPrerender: false,
  },
  workboxOpts: {
    swDest: 'static/service-worker.js',
    runtimeCaching: [
      {
        urlPattern: /\.((jpg)|(png)|(jpeg))/,
        handler: 'CacheFirst',
      },
    ],
  },
  env: {
    VERSION: package.version,
  },
}

module.exports = nextOffline(withBundleAnalyzer(nextConfig))
