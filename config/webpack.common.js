const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CleanWebpackPlugin = require('clean-webpack-plugin')
const helpers = require('./helpers')

module.exports = {
    entry: {
        'polyfills': './client/polyfills.ts',
        'vendor': './client/vendor.ts',
        'app': './client/main.ts'
    },
    resolve: {
        extensions: ['.ts', '.js', '.css']
    },
    optimization: {
        splitChunks: {
            cacheGroups: {
                app: {test: 'app', name: 'app', enforce: true},
                vendor: {test: 'vendor', name: 'vendor', enforce: true},
                polyfills: {test: 'polyfills', name: 'polyfills', enforce: true}
            }
        }
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [{
                    loader: 'awesome-typescript-loader',
                    options: {configFileName: helpers.root('client', 'tsconfig.json')}
                }, 'angular2-template-loader']
            },
            {
                test: /\.html$/,
                use: 'html-loader'
            },
            {
                test: /\.(png|jpe?g|gif|svg|woff|woff2|ttf|eot|ico)$/,
                use: 'file-loader?name=assets/[name].[hash].[ext]'
            },
            {
                test: /\.(css)$/,
                exclude: helpers.root('client', 'app'),
                use: [MiniCssExtractPlugin.loader, 'css-loader']
            },
            {
                test: /\.(css)$/,
                include: helpers.root('client', 'app'),
                use: ['raw-loader']
            }
        ]
    },
    plugins: [
        new webpack.ContextReplacementPlugin(
            /\@angular(\\|\/)core(\\|\/)fesm5/,
            helpers.root('./client'),
            {}
        ),
        new CleanWebpackPlugin([helpers.root('public')], process.cwd()),
        new HtmlWebpackPlugin({
            showErrors: true,
            minify: false,
            hash: true,
            path: helpers.root('public'),
            title: 'Angular App',
            template: './client/index.html',
            filename: 'index.html'
        })
    ]
}