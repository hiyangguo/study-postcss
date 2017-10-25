const gulp = require('gulp');
const postcss = require('gulp-postcss');
const cssnext = require('postcss-cssnext');
const precss = require('precss');
const less = require('gulp-less');
const sass = require('gulp-sass');
const cssnano = require('cssnano');
const bem = require('postcss-bem');
const nested = require('postcss-nested');
const nesting = require('postcss-nesting');

const SYMBOL = {
    BEM: Symbol('css')
};

// post css 处理器
const postCssProcessors = (cssStream, type) => {
    let processors = [
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

    switch (true) {
        case type === SYMBOL.BEM:
            processors = [nested, nesting, bem];
            break;
        default:
            break;
    }

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

// 处理 bem
gulp.task('bem', () => {
    return postCssProcessors(gulp.src('./src/bem.css'), SYMBOL.BEM);
});

gulp.task('default', ['css', 'less', 'sass']);