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
};

module.exports = nextConfig;
