import webpack from 'webpack';
import path from 'path';

export default {
  devtool: 'cheap-module-eval-source-map',
  entry: './public',
  output: {
    path: path.join(__dirname, 'public'),
    filename: 'main.js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: path.join(__dirname, 'public')
      }
    ]
  }
};
