const { resolve } = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')

const APP_DIR = resolve(__dirname, './src')
const VENDOR_LIBS = [
    'react',
    'react-dom',
    'react-router-dom'
]

module.exports = {
    entry: {
        bundle: APP_DIR + '/index.js',
        vendor: VENDOR_LIBS
    },
    output: {
        filename: '[name].[hash].bundle.js',
        path: resolve(__dirname, 'dist/'),
        publicPath: '/'
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: "babel-loader"
            },
            {
                test: /\.css$/,
                use: [{
                    loader: 'style-loader'
                }, {
                    loader: 'css-loader',
                    options: {
                        modules: true,
                        localIdentName: '[name]-[local]-[hash:base64:6]',
                        camelCase: true
                    }
                }]
            },
            {
                test: /\.(png|svg|jpg|gif)$/,
                use: [
                    'file-loader'
                ]
            },
            {
                test: /\.(woff|woff2|eot|ttf|otf)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    devtool: 'eval',
    devServer: {
        contentBase: '/',
        compress: true,
        hot: true,
        port: 4000,
        open: true,
        disableHostCheck: false,
        historyApiFallback: true,
        headers: {
            "X-Custom-header": "custom"
        },
        proxy: {
            '/images': 'http://localhost:5000'
        }
    },
    performance: {
        hints: 'warning'
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: `./index.html`
        }),
    ]
}