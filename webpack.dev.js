const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.common.js');
// const ErrorOverlayPlugin = require('error-overlay-webpack-plugin');

const port = 3000;
let publicUrl = `ws://localhost:${port}/ws`;

//only for github
if (process.env.GITPOD_WORKSPACE_URL) {
  const [schema, host] = process.env.GITPOD_WORKSPACE_URL.split('://');
  publicUrl = `wss://${port}-${host}/ws`;
}

//only for codespaces
if (process.env.CODESPACE_NAME) {
  publicUrl = `wss://${process.env.CODESPACE_NAME}-${port}.app.github.dev/ws`;
}

module.exports = merge(common, {
  mode: 'development',
  devtool: 'cheap-module-source-map',
  devServer: {
    port,
    hot: true,
    allowedHosts: "all",
    historyApiFallback: true,
    static: {
      directory: path.resolve(__dirname, "public"),
    },
    client: {
      webSocketURL: publicUrl
    },
  }
  // HMR is handled automatically by webpack-dev-server 4+
});
