const path = require('path');

module.exports = {
  mode: 'development',
  entry: './frontend/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // string
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  },
  resolve: {
    alias: {
      '@contracts': path.resolve(__dirname, '../../build/contracts/EtherWallet.json')
    }
  }
};
