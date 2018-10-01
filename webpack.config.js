const webpackMerge = require('webpack-merge')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const webpackCommon = require('./config/webpack.common.js')
const helpers = require('./config/helpers')


module.exports = function (env) {
    const config = {
        devtool: 'source-map',
        output: {
            path: helpers.root('public'),
            publicPath: '/',
            filename: '[name].js',
            chunkFilename: '[name].bundle.js'
        },
        mode: (env.mode === 'dev') ? 'development' : 'production',
        plugins: [
            new MiniCssExtractPlugin({
                filename: '[name].bundle.css',
                chunkFilename: '[name].chunk.css'
            })
        ]
    }

    if (env.mode === 'dev') {
        config.devServer = {
            stats: {
                chunks: false,
                colors: true,
                timings: true,
                children: false
            },
            contentBase: helpers.root('public'),
            port: 6602,
            compress: false,
            historyApiFallback: true,
            https: false,
            noInfo: true,
            open: true
        }
    }
    return webpackMerge(webpackCommon, config)
}