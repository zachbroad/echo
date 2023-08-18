const ReactRefreshWebpackPlugin = require('@pmmmwh/react-refresh-webpack-plugin');

module.exports = function override(config, env) {
  if (env === 'development') {
    config.devServer.hot = true;

    // Add the plugin
    config.plugins.push(
      new ReactRefreshWebpackPlugin()
    );

    // Add the babel plugin
    config.module.rules.push({
      test: /\.(js|jsx)$/,
      exclude: /node_modules/,
      use: ['babel-loader', 'react-refresh/babel'],
    });
  }

  return config;
};