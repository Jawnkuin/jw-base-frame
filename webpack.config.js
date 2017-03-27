import webpack from 'webpack';
import path from 'path';
import ExtractTextPlugin from 'extract-text-webpack-plugin';

const PATHS = {
  client: path.join(__dirname, 'client'),
  build: path.join(__dirname, 'build')
};

export default {
  devtool: 'source-map',
  entry: PATHS.client,
  output: {
    path: PATHS.build,
    filename: '[name].js',
    publicPath: '/static/'
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new ExtractTextPlugin('index.css')
  ],
  module: {
    rules: [
      {
        // compile antd/*.less with babel-plugin-import
        test: /\.less$/,
        exclude: PATHS.client,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader'
          },
          {
            loader: 'less-loader'
          }]
          // use: 'css-loader!less-loader'
        })
      },
        // compile self-defined less with css module
      {
        test: /\.less$/,
        exclude: /node_modules/,
        include: PATHS.client,
        loader: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [{
            loader: 'css-loader',
            options: {
              modules: true,
              localIdentName: '[path][name]__[local]--[hash:base64:5]'
            }
          },
          {
            loader: 'less-loader'
          }]
          // use: 'css-loader!less-loader'
        })
      },
      {
        test: /\.js$/,
        loaders: ['babel-loader'],
        exclude: /node_modules/,
        include: PATHS.client
      }
/* ,
      {
         // 专供iconfont方案使用的，后面会带一串时间戳，需要特别匹配到
        test: /\.(woff|woff2|svg|eot|ttf)\??.*$/,
        loader: 'file-loader?name=./static/fonts/[name].[ext]'
      }
      /*
        use: [{
          loader: 'css-loader',
        }, {
          loader: 'less-loader',
          options: {
            modules.true
          }
        }]
      }

      {test: /\.woff(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
      {test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/font-woff'},
      {test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=application/octet-stream'},
      {test: /\.eot(\?v=\d+\.\d+\.\d+)?$/, loader: 'file'},
      {test: /\.svg(\?v=\d+\.\d+\.\d+)?$/, loader: 'url?limit=10000&minetype=image/svg+xml'},
      {test: /\.(png|jpg|jpeg|gif)(\?v=\d+\.\d+\.\d+)?$/i, loader: 'url?limit=10000'}
      */
    ]
  }
};
