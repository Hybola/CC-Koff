//import Other module
const path = require("path");
const { merge } = require("webpack-merge");
const HtmlWebpackPlugin = require("html-webpack-plugin");

//Import Our module
const commonConfig = require("./webpack.config");

//DEV
const devConfig = merge(commonConfig, {
  mode: "development",
  //   output: {
  //     path: path.resolve(__dirname, "dist"),
  //     filename: "[name].[hash].js",
  //     assetModuleFilename: "images/[hash][ext][query]",
  //   },
  /////Loader คือสิ่งที่ทำก่อน bundle code
  module: {
    rules: [
      {
        test: /\.s?css$/i,
        use: [
          "style-loader", // append <link > in html
          "css-loader", // allow import '.index.css'
          "sass-loader", // file ที่ bootstrap ใช้ config
        ],
      },
    ],
  },
  //PLUGIN  เป็น process ที่ทำหลังจาก bundle เสร็จแล้ว
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/template/index.html", //auto generate html file base on template which auto link image
    }),
  ],
});
module.exports = devConfig;
