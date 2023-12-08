/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  transpilePackages: [
    '@babel/runtime',
    'rc-util',
    '@ant-design',
    'antd',
    'rc-pagination',
    'rc-picker',
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
