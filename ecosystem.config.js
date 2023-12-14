module.exports = {
  apps: [
    {
      name: 'chd-web',
      script: 'npm',
      args: 'start',
      autorestart: true,
      watch: false,
      env: {
        NODE_ENV: 'production',
      },
    },
  ],
};
