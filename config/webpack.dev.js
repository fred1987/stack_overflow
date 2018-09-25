const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommon = require('./webpack.common.js')
const helpers = require('./helpers')

module.exports = webpackMerge(webpackCommon, {
    devtool: 'source-map',
    output: {
        path: helpers.root('public'),
        publicPath: '/',
        filename: '[name].js',
        chunkFilename: '[name].bundle.js'
    },
    mode: 'development',
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: '[name].bundle.css',
            chunkFilename: '[name].chunk.css'
        })
    ],
    devServer: {
        stats: {
            chunks: false, // Makes the build much quieter
            colors: true,
            timings: true,
            children: false //removing undefined stats
        },
        contentBase: helpers.root('public'), //contents basepath to be loaded in server
        port: 6602, //port to run dev server
        compress: false, // enable gzip compression
        historyApiFallback: true, // auto reload on compile
        https: false, // true for self-signed, object for cert authority
        noInfo: true, // only errors & warns on hot reload
        open: true // auto open browser
    }
})