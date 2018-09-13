const path = require('path')
const ROOT_PATH = path.resolve(__dirname)
const webpack = require('webpack')
// const glob = require('glob')
const HtmlWebpackplugin = require('html-webpack-plugin')
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin
const ExtractTextPlugin = require('extract-text-webpack-plugin')
const ParallelUglifyPlugin = require('webpack-parallel-uglify-plugin')
// const PurifyCSSPlugin = require('purifycss-webpack')
// const BabelEnginePlugin = require('babel-engine-plugin')
const NameAllModulesPlugin = require('name-all-modules-plugin')
const cdnConfig = require('../app.config').cdn

// 判断是否是开发环境，以便配置  热更新等
const isEnv = process.env.NODE_ENV

const devConf = {
  resolve: {
    extensions: ['.js', '.jsx', '.ejs']
  },
  entry: {
    app: path.join(ROOT_PATH, '../src/app'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'axios',
      'dateformat',
      'lodash',
      'redux-saga',
      'crypto-js',
      'prop-types'
    ]
  },
  output: {
    path: path.join(ROOT_PATH, '../dist'),
    publicPath: '/public/',
    // 达到浏览器最长的缓存的目的
    filename: '[name].js',
    chunkFilename: '[name].js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader'
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            { loader: 'css-loader' },
            { loader: 'less-loader' }
          ]
        })
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
    new webpack.optimize.UglifyJsPlugin(),

    // 生产环境与开发环境都会用到
    new HtmlWebpackplugin({
      filename: 'index.html',
      template: path.join(ROOT_PATH, '../src/template.html')
    }),
    new ExtractTextPlugin({
      filename: 'css/[name].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].js'
    }),
    new webpack.NamedModulesPlugin(), // 异步模块变更不影响其他异步模块
    new NameAllModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new BundleAnalyzerPlugin() // 包分析器
  ]
}

const prodConf = {
  resolve: {
    extensions: ['.js', '.jsx', '.ejs']
  },
  entry: {
    app: path.join(ROOT_PATH, '../src/app.js'),
    vendor: [
      'react',
      'react-dom',
      'react-router-dom',
      'redux',
      'react-redux',
      'axios',
      'dateformat',
      'lodash',
      'redux-saga',
      'crypto-js',
      'prop-types'
    ]
  },
  output: {
    path: path.resolve(ROOT_PATH, '../dist'),
    publicPath: cdnConfig.host,
    filename: '[name].[chunkhash].js'
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
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                minimize: true
              }
            }
          ]
        })
      },
      {
        test: /\.less$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            'css-loader',
            'less-loader'
          ]
        })
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
    new ParallelUglifyPlugin({
      uglifyJS: {
        output: {
          comments: false
        },
        compress: {
          warnings: false
        }
      }
    }),
    // 生产环境与开发环境都会用到
    new HtmlWebpackplugin({
      filename: 'index.html',
      template: path.join(__dirname, '../src/template.html')
    }),
    new ExtractTextPlugin({
      filename: '[name].[chunkhash].css'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      filename: '[name].[chunkhash].js'
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'manifest', // vendor不再打包到 app.js 里面
      filename: '[name].[chunkhash].js',
      minChunks: Infinity
    }),
    new webpack.NamedModulesPlugin(), // 异步模块变更不影响其他异步模块
    new NameAllModulesPlugin(),
    new webpack.DefinePlugin({ // webpack去区分打包的模块文件是开发的bundle 还是生产的bundle
      'process.env': {
        NODE_ENV: JSON.stringify('production')
      }
    }),
    new webpack.NamedChunksPlugin((chunk) => {
      if (chunk.name) { // 替换 chunkID 改成 name, 文件 长缓存
        return chunk.name
      }
      return chunk.mapModules(m => path.relative(m.context, m.request)).join('_')
    })
    // new BabelEnginePlugin({
    //   presets: [
    //     'env'
    //   ]
    // })
    // ----------------------------------------
    // 结合 ExtractTextWbpackPlugin 使用 必须写在它后面 ，去除用不到的plugin
    // new PurifyCSSPlugin({
    //   paths: glob.sync(path.join(__dirname, '.index.html'))
    // })
    // new BundleAnalyzerPlugin() // 包分析器

    // new HtmlInlineChunkPlugin({ // 直接 script标签 插入 manifest 的内容
    //   inlineChunks: ['manifest']
    // })
    // js shaking 没用到的 冗余的代卖去除。
    // ----------------------------------------

  ]
}
module.exports = isEnv === 'development' ? devConf : prodConf
