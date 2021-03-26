const vueLoaderPlugin = require('vue-loader/lib/plugin');
const path = require('path');

module.exports = {  
    entry: {
      app: path.join(__dirname, 'main.js'),
    },
    module: {
      rules:[{
        test: /\.vue$/,
        loader: 'vue-loader',
      }, {
        test: /\.css$/,
        use : [
          'vue-style-loader',
          'css-loader',
        ]
      }, {
        test: /\.(png|jpg|svg)$/,
        use: [{
          loader: 'file-loader',
          options:{
            esModule: false,
            name: "[name].[ext]"
          }
        }]
      }],
    },
    plugins: [
      new vueLoaderPlugin(),
    ],
    output: {
      filename: '[name].js',
      path: path.join(__dirname, 'dist'),
      publicPath: '/dist',
    },
    mode: 'development',
    devtool: 'eval',
    resolve:{
      extensions: ['.js', 'vue'],
    },
    devServer: {
      proxy: {
        '/api/*': {
          target: 'http://localhost:3000',
          secure: false,
          changeOrigin: true,
          logLevel: 'debug'
        }
      }
    }
};