const webpack = require('webpack')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const isProd = process.env.NODE_ENV === 'production'

const nextConfig = {
  target: 'serverless',
  assetPrefix: isProd ? '/e-hentai-view' : '',
  webpack(config) {
    config.plugins.push(new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/))
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
