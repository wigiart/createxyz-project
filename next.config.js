/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',  // Enable static HTML export
  images: {
    unoptimized: true, // Required for static export
    domains: ['wigiart.com'], // Add your domain
  },
  trailingSlash: true, // Add trailing slashes to URLs
  reactStrictMode: true,
  swcMinify: true,
  experimental: {
    esmExternals: 'loose'
  },
  webpack: (config) => {
    config.externals = [...config.externals, { canvas: "canvas" }]; // required to make pdfjs work
    return config;
  },
  // Base path if not deploying to root
  // basePath: '/subdirectory', // Uncomment and modify if deploying to a subdirectory
};

module.exports = nextConfig;