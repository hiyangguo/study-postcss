# PostCSS和预处理器
如果你喜欢使用PostCSS，但又不想抛弃你最喜欢的预处理器。不用担心，你不需要作出二选一的选择，你可以把PostCSS和预处理器(Sass、Stylus或LESS)结合起来使用。
这篇文章会介绍一些 PostCSS 插件，然后告诉你如何将他们与预处理器结合使用。

## 为什么要使用两个？
虽然你可以只使用预处理器进行工作，但PostCSS的插件会让你的工作更加简单。

## 使用
下面以`gulp`配置和`webpack`配置为例。
在进入 coding 前，请安装一下依赖:
```
npm install postcss-cssnext cssnano precss --save-dev
```
### 选装


## gulp
首先安装 gulp 相关依赖
```
npm install gulp gulp-less gulp-postcss gulp-sass  --save-dev
```
然后新建 `gulpfile.js`。
```javascript
const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
const less = require('gulp-less');
const sass = require('gulp-sass');
const cssnano = require('cssnano');

// post css 处理器
const postCssProcessors = cssStream => {
    const processors = [
        // cssNext 语法支持
        // 详见 {@link cssNext 官网| http://cssnext.io/features/ }
        cssnext,
        // 自动添加处理浏览器前缀
        precss,
        // 压缩 css 代码
        cssnano({
            preset: ['default', {
                discardComments: {
                    removeAll: true
                }
            }]
        })
    ];
    return cssStream.pipe(postcss(processors)).pipe(gulp.dest('./dest/'));
};

// 处理 css
gulp.task('css', () => {
    return postCssProcessors(gulp.src('./src/*.css'));
});

// 处理 less
gulp.task('less', () => {
    const cssStream = gulp.src('./src/*.less').pipe(less());
    return postCssProcessors(cssStream);
});

// 处理 Sass
gulp.task('sass', () => {
    const cssStream = gulp
        .src('./src/*.scss')
        .pipe(sass().on('error', sass.logError));
    return postCssProcessors(cssStream);
});

gulp.task('default', ['css', 'less', 'sass']);
```
需要注意的是，无论是`Sass`还是`less` 或是其他的预处理器都是先转换成 `css` 再使用 `PostCSS` 进行处理

## webpack
首先安装依赖
```
npm insatll webpack extract-text-webpack-plugin style-loader less-loader postcss-loader css-loader postcss-less 
```
然后新建 `webpack.config.js`。

```javascript
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
```