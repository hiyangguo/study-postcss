const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const less = Symbol('less');
const sass = Symbol('sass');

const extractLess = new ExtractTextPlugin({
    filename: '[name].css'
});

const getLoader = (type) => {
    const use = [
        {
            loader: 'css-loader',
            options: {
                minimize: {
                    preset: ['default', {
                        discardComments: {
                            removeAll: true
                        }
                    }]
                }
            }
        }, {
            loader: 'postcss-loader'
        }
    ];

    switch (true) {
        case type === less:
            use.push({
                loader: 'less-loader'
            });
            break;
        case type === sass:
            use.push({
                loader: 'sass-loader'
            });
            break;
        default:
    }

    return extractLess.extract({
        use,
        fallback: 'style-loader?{attrs:{prop: "value"}}'
    });
};

module.exports = {
    entry: [
        path.join(__dirname, 'src/index')
    ],
    output: {
        path: path.resolve(__dirname, 'dest/webpack'),
        filename: 'bundle.js'
    },
    plugins: [extractLess],
    module: {
        rules: [
            {
                test: /\.css$/,
                loader: getLoader()
            },
            {
                test: /\.less$/,
                loader: getLoader(less)
            },
            {
                test: /\.scss/,
                loader: getLoader(sass)
            }
        ]
    }
};