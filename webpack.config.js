var path = require('path');
var webpack = require('webpack');
var FlowtypePlugin = require('flowtype-loader/plugin');
//var GlobalizePlugin = require('globalize-webpack-plugin');

module.exports = {
    devtool: 'cheap-module-source-map',
    entry: [
        'react-hot-loader/patch',
        'webpack-hot-middleware/client',
        './src/app/index'
    ],
    output: {
        path: path.join(__dirname, 'dist'),
        filename: 'bundle.js',
        publicPath: '/static/'
    },
    plugins: [
        // new GlobalizePlugin({
        //     production: false,
        //     developmentLocale: "en",
        //     supportedLocales: [ "ar", "de", "en", "es", "pt", "ru", "zh" ],
        //     messages: "messages/[locale].json",
        //     output: "i18n/[locale].[hash].js"
        // }),
        new FlowtypePlugin(),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin(),
        new webpack.ProvidePlugin({
            $: "jquery",
            jquery: "jquery",
            jQuery: "jquery",
            "window.jQuery": "jquery",
            "window.jquery": "jquery"
        }),
    ],
    eslint: {
        configFile: '.eslintrc',
        failOnWarning: false,
        failOnError: false
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                loader: 'eslint'
            }
            , {
                test: /\.js$/
                , loader: "flowtype"
                , exclude: /node_modules/
            }
        ],
        loaders: [
            {
                test: /\.jsx?$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src')
            }
            , {
                test: /\.css$/, loader: "style!css"
            }
            , {test: /\.less$/, loader: "style-loader!css-loader!less-loader"}
            , {test: /\.gif$/, loader: "url-loader?mimetype=image/png"}
            , {
                test: /\.woff(2)?(\?[a-z0-9#=&.]+)?$/, loader: 'url?limit=10000&mimetype=application/font-woff'
            }
            , {
                test: /\.(ttf|eot|svg)(\?[a-z0-9#=&.]+)?$/, loader: 'file'
            }
        ]

    }
};
