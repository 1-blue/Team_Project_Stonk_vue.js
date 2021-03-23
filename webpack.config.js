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
        test: /\.(png|jpg)$/,
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
      before: function (app, server, compiler) {
        app.get('/price', function (req, res) {
          res.json({"parsnip": 300, "parsnipSeed": 10, "cauliflower": 100,"cauliflowerSeed": 5,"strawberry": 500,"strawberrySeed": 50,"seeds": 20,"icecream": 150,"survivalHamburger": 80,"friedEgg": 50,"cheeseCauliflower": 30})
          console.log("request!")
        });
      },
    }
};