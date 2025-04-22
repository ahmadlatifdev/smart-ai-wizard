// next.config.js
const nextConfig = {
  env: {
    NODE_ENV: process.env.NODE_ENV || 'production', // fallback safeguard
  },
  webpack: (config) => {
    config.plugins.push(
      new require('webpack').DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'production')
      })
    );
    return config;
  }
};

module.exports = nextConfig;
