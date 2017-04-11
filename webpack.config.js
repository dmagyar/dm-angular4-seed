var webpack = require('webpack');
var path = require('path');
var webpackMerge = require('webpack-merge');
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// Webpack Config
var webpackConfig = {
  entry: {
    'main': './src/main.browser.ts'
  },

  output: {
    publicPath: '',
    path: path.resolve(__dirname, './dist'),
  },

  plugins: [
    new webpack.ContextReplacementPlugin(
    /angular(\\|\/)core(\\|\/)@angular/,
    path.resolve(__dirname, '../src')
  ),
    new webpack.ProvidePlugin({   
      jQuery: 'jquery',
      $: 'jquery',
      jquery: 'jquery'
  }),
  new ExtractTextPlugin("styles.css")
],

  module: {
    loaders: [
      // .ts files for TypeScript
      {
        test: /\.ts$/,
        loaders: [
          'awesome-typescript-loader',
          'angular2-template-loader',
          'angular2-router-loader'
        ]
      },
      { test: /\.css$/, loaders: ['to-string-loader', 'css-loader'] },
      { test: /\.html$/, loader: 'raw-loader' },
      {
             test: /\.scss$/,
             loaders: ['raw-loader', 'sass-loader']
      },
      {     
             test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
             loader: "url-loader?limit=10000&minetype=application/font-woff" 
      },
      {      test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, 
             loader: "file-loader" 
      }
    ]
  }

};


// Our Webpack Defaults
var defaultConfig = {
  devtool: 'source-map',

  output: {
    filename: '[name].bundle.js',
    sourceMapFilename: '[name].map',
    chunkFilename: '[id].chunk.js'
  },

  resolve: {
    extensions: [ '.ts', '.js' ],
    modules: [ path.resolve(__dirname, 'node_modules') ]
  },

  devServer: {
    historyApiFallback: true,
    watchOptions: { aggregateTimeout: 300, poll: 1000 },
    headers: {
      "Access-Control-Allow-Origin": "*",
      "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, PATCH, OPTIONS",
      "Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
    }
  },

  node: {
    global: true,
    crypto: 'empty',
    __dirname: true,
    __filename: true,
    process: true,
    Buffer: false,
    clearImmediate: false,
    setImmediate: false
  }
};


module.exports = webpackMerge(defaultConfig, webpackConfig);
