const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const Dotenv = require('dotenv-webpack');

module.exports = {
  entry: './src/front/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'public'),
    publicPath: '/'
  },
  module: {
    exprContextCritical: false,
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: ['babel-loader']
      },
      {
        test: /\.(css|scss)$/,
        use: ['style-loader', 'css-loader']
      },
      {
        test: /\.(png|svg|jpg|gif|jpeg|webp)$/,
        type: 'asset/resource'
      },
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: 'asset/resource'
      }
    ]
  },
  resolve: {
    extensions: ['*', '.js']
  },
  plugins: [
  ],
  ignoreWarnings: [
    {
      module: /react-datepicker/,
      message: /request of a dependency is an expression/
    }
  ],
  plugins: [
    new HtmlWebpackPlugin({
      favicon: '4geeks.ico',
      template: 'template.html'
    }),
    new Dotenv({ safe: false, systemvars: true })
  ]
};