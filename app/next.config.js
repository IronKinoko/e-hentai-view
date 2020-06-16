const webpack = require('webpack')
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
    VERSION: '2.1.0',
  },
}

module.exports = withBundleAnalyzer(nextConfig)
