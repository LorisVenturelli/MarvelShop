// shared config (dev and prod)
const { resolve } = require('path')
const { CheckerPlugin } = require('awesome-typescript-loader')
const StyleLintPlugin = require('stylelint-webpack-plugin')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const autoprefixer = require('autoprefixer')
const webpack = require('webpack')

const isProd = (process.env.NODE_ENV === 'production')
const isDev = (process.env.NODE_ENV === 'development')

console.info(`Production mode : ${isProd}\nDevelopment mode : ${isDev}\n`)

module.exports = {
  target: 'web',
  resolve: {
    modules: [
      'node_modules',
      'src',
    ],
    extensions: ['.ts', '.tsx', '.js', '.jsx'],
  },
  context: resolve(__dirname, '../../src'),
  module: {
    rules: [
      {
        test: /\.js$/,
        use: ['babel-loader', 'source-map-loader'],
        exclude: /node_modules/,
      },
      {
        test: /\.tsx?$/,
        use: ['babel-loader', 'awesome-typescript-loader'],
      },
      {
        test: /\.(css|scss)$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                importLoaders: 2,
                sourceMap: isDev,
                minimize: isProd,
              },
            },
            {
              loader: 'postcss-loader',
              options: {
                ident: 'postcss',
                sourceMap: isDev,
                plugins: () => {
                  return [
                    autoprefixer({
                      browsers: [
                        'last 3 version',
                        'ie >= 10',
                      ],
                    }),
                  ]
                },
              },
            },
            {
              loader: 'sass-loader',
              options: {
                data: '@import "src/assets/theme/share";',
                outputStyle: 'expanded',
                sourceMap: isDev,
                sourceMapContents: isDev,
                precision: 10
              },
            },
          ],
        }),
      },
      {
        test: /\.html$/,
        use: [{
          loader: 'html-loader',
          options: {
            minimize: isProd,
            interpolate: true,
          },
        }],
      },
      {
        test: /\.(woff|woff2|ttf|otf|eot|svg)/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: `assets/fonts/[name]-[hash].[ext]`,
            },
          },
        ],
      },
      {
        test: /\.(jpg|png|gif|jpeg)$/,
        use: [
          {
            loader: 'file-loader',
            query: {
              name: 'assets/img/[name]-[hash].[ext]',
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new CheckerPlugin(),
    new webpack.DefinePlugin({
      'process.env': {
        NODE_ENV: JSON.stringify(process.env.NODE_ENV),
      },
    }),
    new StyleLintPlugin(),
    new HtmlWebpackPlugin({ template: 'index.html' }),
  ],
}
