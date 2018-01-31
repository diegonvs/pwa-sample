const path = require('path');
const webpack = require('webpack');
const workbox = require('workbox-webpack-plugin');
const HTMLGenPlugin = require('html-webpack-plugin');
const cleanPlugin = require('clean-webpack-plugin');
const UglyfyJS = require('uglifyjs-webpack-plugin');
// const ManifestPlugin = require('webpack-manifest-plugin');
// const manifest = require('./src/manifest.json');

module.exports = {
  entry: path.join(__dirname, 'src/app.js'),

  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },

  devServer: {
    contentBase: path.join(__dirname, "dist"),
    port: 1234,
    compress: true
  },

  plugins: [
    new HTMLGenPlugin({
      title: 'PWA Sample'
    }),

    new cleanPlugin(),

    new UglyfyJS(),

    new workbox({
      globDirectory: 'dist',
      globPatterns: ['**/*.{html,js}'],
      swDest: path.join('dist', 'sw.js'),
      swSrc: './src/sw.js',
      clientsClaim: true,
      skipWaiting: true,
      runtimeCaching: [
        {
          urlPattern: new RegExp('https://hacker-news.firebaseio.com'),
          handler: 'staleWhileRevalidate'
        }
      ]
    }),

    // new ManifestPlugin({
    //   fileName: 'manifest.json',
    //   basePath: 'dist/',
    //   seed: manifest
    // })
  ]
};