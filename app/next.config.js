const webpack = require('webpack')
const package = require('../package.json')
const nextOffline = require('next-offline')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

// const isProd = process.env.NODE_ENV === 'production'
// const isVercel = process.env.VERCEL_GITHUB_DEPLOYMENT === '1'
const nextConfig = {
  // target: 'serverless',
  // assetPrefix: isProd ? (isVercel ? '' : '/e-hentai-view') : '',
  webpack(config) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/)
    )
    return config
  },
  devIndicators: {
    autoPrerender: false,
  },
  env: {
    VERSION: package.version,
  },
}

module.exports = nextOffline(withBundleAnalyzer(nextConfig))
