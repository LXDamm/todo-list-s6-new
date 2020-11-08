const path = require('path');

module.exports = {
    // ...
    entry: {
      "main": "./src/index.js"
    },
    output: {
      path: path.join(__dirname, 'dist'),
      filename: "[name].js",
      sourceMapFilename: "[name].js.map"
    },
    devtool: "source-map"
    // ...
};
