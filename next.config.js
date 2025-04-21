/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  compiler: {
    reactRemoveProperties: true,
  },
  experimental: {
    reactRoot: true,
  },
  webpack(config) {
    config.resolve.fallback = { fs: false, path: false };
    return config;
  }
}

module.exports = nextConfig;
