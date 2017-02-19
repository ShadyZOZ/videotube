var path = require('path');
var webpack = require('webpack');
let entries_name = [
    'home',
    'detail'
];
let entries = {};
for (let i = 0; i < entries_name.length; i++) {
    let entry_name = entries_name[i];
    entries[entry_name] = __dirname + '/src/' + entry_name + '/index.js';
}
entries['vendor'] = [
    'react',
    'react-dom',
    'material-ui'
];
module.exports = {
    entry: entries,
    output: {
        library: '[name]',
        libraryTarget: 'var',
        filename: '[name].js',
        path: __dirname + '/dist/assets/'
    },
    resolve: {
        root: [
            path.resolve(__dirname + '/node_modules')
        ],
        extensions: ['', '.js']
    },
    module: {
        loaders: [
            {
                test: /\.js(x?)$/,
                exclude: /(lodash|node_modules)/,
                loader: 'babel-loader',
                query: {
                    presets: ['es2015', 'react']
                }
            },
            {
                test: /\.less/,
                loader: 'style-loader!css-loader' +
                '!postcss-loader' +
                '!less-loader'
            },
            {
                test: /\.(png|jpg|woff)$/,
                loader: 'url-loader'
            }
        ]
    },
    postcss: function () { return [require('autoprefixer'), require('precss')] },
    plugins: [
        new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development') }),
        new webpack.optimize.CommonsChunkPlugin({
            name: 'vendor',
            minChunks: Infinity
        })
    ],
    devtool: 'cheap-module-source-map'
};