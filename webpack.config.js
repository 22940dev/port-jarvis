const path = require("path");
const WebpackAssetsManifest = require("webpack-assets-manifest");
const SriPlugin = require("webpack-subresource-integrity");
const CopyPlugin = require("copy-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const isProd = process.env.NODE_ENV === "production";

module.exports = {
  entry: [
    path.resolve(__dirname, "assets/js/index.js"),
    path.resolve(__dirname, "assets/sass/main.scss"),
  ],
  mode: isProd ? "production" : "development",
  devtool: isProd ? "nosources-source-map" : "source-map",
  output: {
    filename: isProd ? "js/[name]-[contenthash:8].js" : "js/[name].js",
    path: path.resolve(__dirname, "static/assets/"),
    publicPath: "/assets/",
    clean: true,
    crossOriginLoading: "anonymous",
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: isProd ? "css/[name]-[contenthash:8].css" : "css/[name].css",
    }),
    new SriPlugin({
      hashFuncNames: ["sha512"],
      enabled: true,
    }),
    new WebpackAssetsManifest({
      writeToDisk: true,
      output: path.resolve(__dirname, "data/manifest.json"),
      publicPath: true,
      integrity: true,
    }),
    new CopyPlugin({
      patterns: [
        {
          from: path.resolve(__dirname, "assets/images/"),
          to: "images/"
        },
        {
          from: path.resolve(__dirname, "node_modules/twemoji-emojis/vendor/svg/"),
          to: "emoji/"
        },
      ],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: [
          { loader: "babel-loader" }
        ],
      },
      {
        test: /\.(sa|sc|c)ss$/i,
        use: [
          MiniCssExtractPlugin.loader,
          { loader: "css-loader", options: { sourceMap: true } },
          {
            loader: "postcss-loader",
            options: {
              sourceMap: true,
              postcssOptions: {
                config: false,
                plugins: [
                  require("autoprefixer")(),
                  require("postcss-svgo")({
                    encode: true,
                  }),
                  require("postcss-focus")(),
                  require("postcss-color-rgba-fallback")({
                    properties: [
                      "background-image"
                    ],
                  }),
                  require("postcss-combine-duplicated-selectors")(),
                  require("postcss-normalize-charset")(),
                ],
              },
            },
          },
          { loader: "sass-loader", options: { sourceMap: true } },
        ],
      },
      {
        test: /\.(woff(2)?|ttf|otf|eot)$/i,
        use: [
          {
            loader: "file-loader",
            options: {
              name: "[name].[ext]",
              outputPath: "fonts/",
            },
          },
        ],
      },
    ],
  },
  optimization: {
    minimizer: [
      `...`,
      new CssMinimizerPlugin({
        minify: CssMinimizerPlugin.cleanCssMinify,
        minimizerOptions: {
          compatibility: "*",
          level: 1,
          processImport: false,
          format: {
            breaks: {
              afterAtRule: true,
              afterBlockBegins: true,
              afterBlockEnds: true,
              afterComment: true,
              afterRuleEnds: true,
              beforeBlockEnds: true,
            },
            spaces: {
              beforeBlockBegins: true,
            },
            semicolonAfterLastProperty: true,
          },
        },
      }),
    ],
  },
  devServer: {
    contentBase: path.join(__dirname, "public/"),
    publicPath: "/assets/",
    port: process.env.PORT || 1337,
    compress: true,
  },
};
