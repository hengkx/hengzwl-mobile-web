/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@ant-design/icons',
    'rc-util',
    'rc-pagination',
    'rc-picker',
    '@ant-design/icons-svg',
    'rc-tree',
    'rc-table',
  ],
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'oss.hengzwl.com',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = nextConfig;
