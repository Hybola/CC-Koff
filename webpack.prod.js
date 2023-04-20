//import Other module
const path = require("path");

const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const TerserPlugin = require("terser-webpack-plugin");
const CssMinimizer = require("css-minimizer-webpack-plugin");

//Import Our module
const commonConfig = require("./webpack.config");

//DEV
const prodConfig = merge(commonConfig, {
  mode: "production",
  output: {
    path: path.resolve(__dirname, "docs"),
    filename: "[name].[hash].min.js", ///min คือ minify == remove all code comment and white space
    assetModuleFilename: "images/[hash][ext][query]",
  },
  /////Loader คือสิ่งที่ทำก่อน bundle code
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          MiniCssExtractPlugin.loader, // append <link > in html
          "css-loader", // allow import '.index.css'
          "sass-loader", // file ที่ bootstrap ใช้ config
        ],
      },
    ],
  },
  //PLUGIN  เป็น process ที่ทำหลังจาก bundle เสร็จแล้ว
  plugins: [new MiniCssExtractPlugin(), new CleanWebpackPlugin()],
  optimization: {
    minimizer: [
      new TerserPlugin(),
      new CssMinimizer(),
      new HtmlWebpackPlugin({
        template: "./src/template/index.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true,
        },
      }),
    ],
  },
});
module.exports = prodConfig;
