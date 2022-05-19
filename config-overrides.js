const path = require('path');

module.exports = function override(config) {
  config.resolve = {
    ...config.resolve,
    alias: {
      ...config.alias,
      '@src': path.resolve(__dirname, 'src/'),
      '@configs': path.resolve(__dirname, 'src/configs')
    },
  };

  return config;
};