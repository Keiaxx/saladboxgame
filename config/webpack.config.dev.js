const CopyWebpackPlugin = require('copy-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const fs = require('fs')
const webpack = require('webpack')
const paths = require('./paths')

// Define plugin
const definePluginOptions = {
  'CANVAS_RENDERER': JSON.stringify(true),
  'WEBGL_RENDERER': JSON.stringify(true)
}

// Html webpack plugin
const htmlPluginOptions = {
  inject: true,
  template: paths.appHtml
}

// Copy webpack plugin
const filesToCopy = []
if (fs.existsSync(paths.appStatic)) {
  filesToCopy.push({
    context: paths.appPath,
    from: 'static',
    to: 'static',
    cache: true
  })
}

module.exports = {
  mode: 'development',
  devtool: 'inline-cheap-source-map',
  entry: paths.appEntry,
  output: {
    path: paths.appBuild,
    publicPath: '/',
    filename: 'js/[name].bundle.js'
  },
  module: {
    rules: [
        { test: /(\.css$)/, loaders: ['style-loader', 'css-loader'] },
        { test: /\.(woff|woff2|eot|ttf|svg)$/, loader: 'url-loader?limit=100000' },
      {
        test: [/\.js$/],
        use: 'babel-loader',
        include: paths.appSrc
      },
      {
        loader: 'file-loader',
        test: [/\.(png|jpg|gif|xml|ogg|mp3)$/],
        options: {
          name: 'assets/[name].[ext]'
        }
      },
      {
        loader: 'raw-loader',
        test: [/\.(vert|frag)$/],
        options: {
          name: 'assets/[name].[ext]'
        }
      }
    ]
  },
  optimization: {
    splitChunks: {
      cacheGroups: {
        commons: {
          test: /phaser/,
          name: 'vendor',
          chunks: 'all'
        }
      }
    }
  },
  plugins: [
    new webpack.DefinePlugin(definePluginOptions),
    new HtmlWebpackPlugin(htmlPluginOptions),
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new CopyWebpackPlugin(filesToCopy)
  ],
  resolve: {
    alias: {
      '@': paths.appSrc
    }
  },
  performance: {
    hints: false
  }
}
