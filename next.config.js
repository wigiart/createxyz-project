/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true,
    domains: ['wigiart.com'],
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  // Ensure consistent asset handling
  assetPrefix: process.env.NODE_ENV === 'production' ? '' : '',
  basePath: '',
  // Handle webpack externals
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    // Ensure consistent module resolution
    config.resolve = {
      ...config.resolve,
      fallback: {
        ...config.resolve.fallback,
        fs: false,
        path: false,
      },
    };
    return config;
  },
}

module.exports = nextConfig