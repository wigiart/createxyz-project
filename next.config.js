/** @type {import('next').NextConfig} */
const nextConfig = {
  // Remove output: 'export' to allow middleware
  images: {
    unoptimized: true,
    domains: ['wigiart.com'],
  },
  trailingSlash: true,
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }];
    return config;
  },
};

module.exports = nextConfig;