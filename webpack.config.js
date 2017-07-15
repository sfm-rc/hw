const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const AppCachePlugin = require('./plugins/webpack-app-cache-plugin');
const AppVersionPlugin = require('./plugins/webpack-app-version-plugin')

module.exports = (env) => {
  const ecosystem = require('./ecosystem.config')[env.ecosystem || 'prod']; // eslint-disable-line
  const __DEV__ = !!env.development; // eslint-disable-line
  const __PROD__ = !!env.production; // eslint-disable-line
  const PATHS = {
    app: path.join(__dirname, 'src'),
    dist: path.join(__dirname, 'dist'),
    publicPath: __PROD__ ? ecosystem.CDN : '/',
  };

  console.log('==> ecosystem: ', JSON.stringify(ecosystem, null, 2));
  console.log('==> __DEV__: ', __DEV__);
  console.log('==> __PROD__: ', __PROD__);

  const svgSpriteDirs = [
    require.resolve('antd-mobile').replace(/warn\.js$/, ''), // antd-mobile 内置svg
    //path.resolve(__dirname, 'src/my-project-svg-foler'),  // 业务代码本地私有 svg 存放目录
  ];

  const config = {
    output: {
      path: PATHS.dist,
      filename: '[name]-[hash].js',
      publicPath: PATHS.publicPath,
    },
    entry: [`${PATHS.app}/client`],
    module: {
      rules: [{
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: 'babel-loader',
      }, {
        test: /\.(woff|woff2|ttf|otf|eot)$/,
        loader: 'file-loader',
      }, {
        test: /\.(jpg|png|gif)$/i,
        loader: 'file-loader?name=[name].[ext]',
      }, {
        test: /\.svg$/,
        loader: 'svg-sprite-loader',
        include: svgSpriteDirs,
      }],
    },

    resolve: {
      mainFiles: ['index.web', 'index'],
      modules: ['app', 'node_modules', path.join(__dirname, '../node_modules')],
      extensions: [
        '.web.tsx', '.web.ts', '.web.jsx', '.web.js', '.ts', '.tsx',
        '.js',
        '.jsx',
        '.react.js',
      ],
      mainFields: [
        'browser',
        'jsnext:main',
        'main',
      ],
    },

    plugins: [new HtmlWebpackPlugin({
      template: `${PATHS.app}/assets/template.html`,
      inject: 'body',
    })],
    devServer: {
      publicPath: PATHS.publicPath,
      contentBase: PATHS.dist,
      historyApiFallback: true,
      compress: true,
      inline: true,
      port: 7070,
      host: '192.168.18.5',
      // disableHostCheck: true,
      // proxy: {
      //   '/api': {
      //     target: `http://${ecosystem.API_HOST}`,
      //     secure: false,
      //     changeOrigin: true,
      //   },
      // },
    },
  };

  if (__DEV__) {
    config.output.filename = 'app.js';
    config.devtool = 'inline-source-map';
    config.entry.push(
      'webpack-dev-server/client?http://localhost:7070',
      'webpack/hot/only-dev-server');
    config.module.rules.push({
      test: /\.less|css$/i,
      use: ['style-loader', 'css-loader', 'postcss-loader', 'less-loader'],
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(true),
      }),
      new webpack.ContextReplacementPlugin(/\.\/locale$/, 'empty-module', false, /js$/),
      new WriteFilePlugin(),
      new webpack.HotModuleReplacementPlugin());
  }

  if (__PROD__) {
    config.entry = { app: `${PATHS.app}/client` };
    config.module.rules.push({
      test: /\.less$/i,
      use: ExtractTextPlugin.extract({
        fallback: 'style-loader',
        use: ['css-loader', 'postcss-loader', 'less-loader'],
      }),
    });
    config.plugins.push(
      new webpack.DefinePlugin({
        __DEV__: JSON.stringify(false),
        'process.env.NODE_ENV': JSON.stringify('production'),
      }),
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
      new webpack.NoEmitOnErrorsPlugin(),
      new ExtractTextPlugin({
        filename: '[name]-[hash].css',
        allChunks: true,
      }),
      new webpack.optimize.OccurrenceOrderPlugin(),
      new webpack.optimize.AggressiveMergingPlugin(),
      new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
        filename: 'framework-[hash].js',
        minChunks: module => (
          module.resource &&
          module.resource.indexOf('node_modules') !== -1 &&
          module.resource.indexOf('.css') === -1
        ),
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          unused: true,
          dead_code: true,
          warnings: false,
          screw_ie8: true,
        },
        comments: false,
      }),
      new webpack.NoEmitOnErrorsPlugin(),
      new AppCachePlugin({
        exclude: [/\.(jpg|png|gif|zip)$/, 'index.html'],
        routeBase: '/hybrid',
      }),
      new AppVersionPlugin({}));
  }

  return config;
};
