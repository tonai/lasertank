const webpack = require("webpack");
const conf = require("./gulp.conf");
const path = require("path");

const HtmlWebpackPlugin = require("html-webpack-plugin");
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const pkg = require("../package.json");
const autoprefixer = require("autoprefixer");

module.exports = {
  module: {
    // preLoaders: [
    //   {
    //     test: /\.js$/,
    //     exclude: /node_modules/,
    //     loader: 'eslint-loader'
    //   }
    // ],

    loaders: [
      {
        test: /.json$/,
        loaders: ["json-loader"],
      },
      {
        test: /\.(css|scss)$/,
        loaders: [
          "style-loader",
          "css-loader",
          "sass-loader",
          "postcss-loader",
          // ExtractTextPlugin.extract({
          //   fallbackLoader: "style",
          //   loader: "css?minimize!sass!postcss",
          // }),
        ],
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        loaders: ["babel-loader"],
      },
      {
        test: /.html$/,
        loaders: ["html-loader"],
      },
      {
        test: /\.ejs$/,
        loader: "ejs-loader",
        options: {
          esModule: false,
        },
      },
    ],
  },
  plugins: [
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new HtmlWebpackPlugin({
      template: conf.path.src("index.html"),
      inject: true,
    }),
    new webpack.optimize.UglifyJsPlugin({
      compress: { unused: true, dead_code: true }, // eslint-disable-line camelcase
    }),
    new ExtractTextPlugin("index-[contenthash].css"),
  ],
  // postcss: () => [autoprefixer],
  output: {
    path: path.join(process.cwd(), conf.paths.dist),
    filename: "[name]-[hash].js",
  },
  entry: {
    app: `./${conf.path.src("index")}`,
    // vendor: Object.keys(pkg.dependencies)
  },
};
