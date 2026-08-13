import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  webpack: (config) => {
    config.infrastructureLogging = { level: 'error' }
    return config
  },
}

export default nextConfig
