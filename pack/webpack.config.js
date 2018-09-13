const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const webpack = require('webpack')
// const glob = require('glob')
const UglifyJsPlugin = require('uglifyjs-webpack-plugin')
// const CompressionPlugin = require('compression-webpack-plugin')
// const LodashModuleReplacementPlugin = require('lodash-webpack-plugin')

const HtmlWebpackplugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
// const cdnConfig = require('../app.config').cdn // eslint-disable-line

const isEnv = process.env.NODE_ENV

console.log(isEnv)

const devConf = {
  mode: 'development',
  resolve: {
    extensions: ['.js', '.jsx', '.ejs']
  },
  entry: {
    app: path.join(ROOT_PATH, '../src/app')
  },
  output: {
    path: path.join(ROOT_PATH, '../dist'),
    publicPath: '/public/',
    // 达到浏览器最长的缓存的目的
    filename: '[name].[hash].bundle.js',
    chunkFilename: '[name].[hash].bundle.js'
  },
  devtool: '#cheap-module-eval-source-map',
  devServer: {
    host: '0.0.0.0',
    port: 5555,
    contentBase: path.join(ROOT_PATH, '../dist'),
    hot: true,
    overlay: { // 错误显示
      errors: true
    },
    proxy: {
      '/api':
      {
        target: 'http://localhost:2223',
        pathRewrite: { '^/api': '' }
      }
    },
    publicPath: '/public/', // !
    historyApiFallback: {
      index: '/public/index.html'
    }
  },
  module: {
    rules: [
      {
        // loader编译之前，去验证
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        // 排除
        exclude: [
          path.join(ROOT_PATH, '../node_modules'),
          path.join(ROOT_PATH, '../src/libs')
        ]
      },
      {
        test: /.(js|jsx)$/,
        loader: 'babel-loader',
        exclude: [
          path.join(ROOT_PATH, '../node_modules')
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader //eslint-disable-line
          },
          { loader: 'css-loader' }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          // {
          //   loader: MiniCssExtractPlugin.loader //eslint-disable-line
          // },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: 'assets/fonts/[name].[ext]'
              // outputPath: ''
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { // 通过options 配置路径
              name: 'assets/imgs/[name].[ext]',
              limit: 10000
              // publicPath: '',
              // outputPath: ''

            }
          },
          {
            loader: 'img-loader', // 图片压缩
            options: {
              pngquant: {
                quality: 80
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // 生产环境与开发环境都会用到
    new HtmlWebpackplugin({
      filename: 'index.html',
      template: path.join(ROOT_PATH, '../src/template.html')
    }),
    // new LodashModuleReplacementPlugin(),
    new MiniCssExtractPlugin({ //eslint-disable-line
      filename: '[name].css',
      chunkFilename: '[name].css'
    }),
    // new BundleAnalyzerPlugin(),
    new webpack.HotModuleReplacementPlugin()
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          ecma: 6,
          cache: true,
          parallel: true
        }
      })
    ],
    runtimeChunk: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        vendor: { // 将第三方模块提取出来
          test: /(react)|(react-dom)|(react-router-dom)|(redux)|(react-redux)|(axios)|(lodash)|(redux-saga)|(crypto-js)/,
          chunks: 'all',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  }
}
const prodConf = {
  mode: 'production',
  resolve: {
    extensions: ['.js', '.jsx', '.ejs']
  },
  entry: {
    app: path.join(ROOT_PATH, '../src/app.js')
  },
  output: {
    path: path.resolve(ROOT_PATH, '../dist'),
    publicPath: '/public/',
    filename: '[name].[chunkhash].js',
    chunkFilename: '[name].chunk.[chunkhash].js'
  },
  module: {
    rules: [
      {
        // loader编译之前，去验证
        enforce: 'pre',
        test: /.(js|jsx)$/,
        loader: 'eslint-loader',
        // 排除
        exclude: [
          path.join(ROOT_PATH, '../node_modules'),
          path.join(ROOT_PATH, '../src/libs')
        ]
      },
      {
        test: /.jsx$/,
        loader: 'babel-loader'
      },
      {
        test: /.js$/,
        loader: 'babel-loader',
        exclude: [
          path.join(ROOT_PATH, '../node_modules')
        ]
      },
      {
        test: /\.css$/,
        use: [
          { loader: 'style-loader' },
          {
            loader: MiniCssExtractPlugin.loader
          },
          { loader: 'css-loader',
            options: {
              minimize: true
            }
          }
        ]
      },
      {
        test: /\.less$/,
        use: [
          { loader: 'style-loader' },
          { loader: 'css-loader' },
          { loader: 'less-loader' }
        ]
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              limit: 8192,
              name: '[name].[ext]',
              outputPath: 'assets/fonts/'
            }
          }
        ]
      },
      {
        test: /\.(png|jpg|jpeg|gif)$/,
        use: [
          {
            loader: 'url-loader',
            options: { // 通过options 配置路径
              name: '[name].[ext]',
              limit: 8192,
              outputPath: 'assets/imgs/'

            }
          },
          {
            loader: 'img-loader', // 图片压缩
            options: {
              pngquant: {
                quality: 80
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    // new LodashModuleReplacementPlugin(),
    new HtmlWebpackplugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/template.html')
      // minify: {
      //   removeComments: true,
      //   collapseWhitespace: true,
      //   removeRedundantAttributes: true,
      //   useShortDoctype: true,
      //   removeEmptyAttributes: true,
      //   removeStyleLinkTypeAttributes: true,
      //   keepClosingSlash: true,
      //   minifyJS: true,
      //   minifyCSS: true,
      //   minifyURLs: true
      // },
      // chunksSortMode: 'dependency'
    }),
    new MiniCssExtractPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new webpack.DefinePlugin({ // webpack去区分打包的模块文件是开发的bundle 还是生产的bundle
      'process.env.NODE_ENV': JSON.stringify('production')
    })
    // new BundleAnalyzerPlugin() // 包分析器
    //    new CompressionPlugin({ //gzip
    //   test: /\.js$|\.css$/,
    //   cache: true,
    //   asset: '[path].gz[query]',
    //   algorithm: 'gzip',
    //   threshold: 0,
    //   minRatio: 0.8,
    //   deleteOriginalAssets: true
    // }),
  ],
  optimization: {
    minimizer: [
      new UglifyJsPlugin({
        uglifyOptions: {
          comments: false,
          ecma: 6,
          cache: true,
          parallel: true
        }
      })
    ],
    runtimeChunk: true,
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      cacheGroups: {
        // commons: {
        //   chunks: 'initial',
        //   minChunks: 2,
        //   maxInitialRequests: 5,
        //   minSize: 0
        // },
        vendor: { // 将第三方模块提取出来
          test: /(react)|(react-dom)|(react-router-dom)|(redux)|(react-redux)|(axios)|(lodash)|(redux-saga)|(crypto-js)/,
          // test: /[\\/]node_modules[\\/]/,
          chunks: 'all',
          name: 'vendor',
          priority: 10, // 优先
          enforce: true
        }
      }
    }
  }
}

module.exports = isEnv === 'development' ? devConf : prodConf
