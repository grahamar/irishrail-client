import webpack from 'webpack';
import path from 'path';
import yargs from 'yargs';

const libraryName = 'fcp-client';
const UglifyJsPlugin = webpack.optimize.UglifyJsPlugin;

let outputFile;
const rootDir = path.resolve(__dirname);
const plugins = [];

if (yargs.argv.env === 'build') {
  plugins.push(new UglifyJsPlugin({
    minimize: true,
    sourceMap: true,
    compress: { warnings: false }
  }));
  outputFile = libraryName + '.min.js';
} else {
  outputFile = libraryName + '.js';
}

const config = {
  context: rootDir,
  target: 'node',
  devtool: 'source-map',
  entry: {
    main: ['./src/index.js']
  },
  output: {
    path: __dirname + '/lib',
    filename: outputFile,
    library: libraryName,
    libraryTarget: 'umd',
    umdNamedDefine: true
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loaders: [
          { loader: 'babel-loader?cacheDirectory' },
          { loader: 'eslint-loader' }
        ]
      }
    ]
  },
  resolve: {
    modules: ['src', 'node_modules'],
    extensions: ['.js']
  },
  externals: {
    'node-tokens': 'node-tokens',
    'request': 'request',
    'request-promise-native': 'request-promise-native'
  },
  plugins: plugins
};

module.exports = config;
