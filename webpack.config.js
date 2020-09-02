const HtmlWebPackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node-modules/,
                use:
                {
                    loader: "babel-loader",
                }
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use:
                {
                    loader: "file-loader",
                    options: {
                        esModule: false,
                    },
                }
            },
            {
                test: /\.html$/,
                use: [
                    {
                        loader: "html-loader",
                        options: { minimize: false }
                    }
                ]
            },
            {
                test: /\.scss$/,
                use: [
                    "style-loader",
                    "css-loader",
                    "sass-loader"
                ]
            },
        ]
    },
    plugins: [
        new HtmlWebPackPlugin({
            // template: "./src/index.html",
            template: "./src/index.blade.php",
            filename: "./index.html"
        }),
        new MiniCssExtractPlugin({
            filename: "[name].css",
            chunkFilename: "[id].css"
        }),
    ]
}