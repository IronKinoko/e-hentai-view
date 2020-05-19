const webpack = require('webpack')
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
})

const nextConfig = {
  webpack(config) {
    config.plugins.push(
      new webpack.ContextReplacementPlugin(/moment[/\\]locale$/, /zh-cn/),
    )
    return config
  },
}

module.exports = withBundleAnalyzer(nextConfig)
