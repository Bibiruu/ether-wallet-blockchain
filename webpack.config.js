const path = require('path');

module.exports = {
  mode: 'development',
  entry: './fronted/client/index.js',
  output: {
    path: path.resolve(__dirname, 'public'),
    filename: 'bundle.js', // string
  },
  devServer: {
    static: path.join(__dirname, 'public'),
    compress: true,
    port: 8080
  }
};
