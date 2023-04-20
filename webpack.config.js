// IMPORT : COMMON JS

module.exports = {
  entry: {
    main: "./src/index.js",
    vendor: "./src/vendor.js",
  },

  /////Loader คือสิ่งที่ทำก่อน bundle code
  module: {
    rules: [
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
};
