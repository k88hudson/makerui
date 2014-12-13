var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var size = require('gulp-size');

gulp.task('build', function() {
    return gulp.src('./less/makerui.less')
        .pipe(plumber({
            errorHandler: function onError(err) {
                gutil.log(gutil.colors.red(err));
                gutil.beep();
                this.emit('end');
            }
        }))
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(minifyCSS({keepBreaks:false}))
        .pipe(autoprefixer({
            browsers: ['last 2 versions', 'android >= 4.2'],
            cascade: false,
            remove: false
        }))
        .pipe(size())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./demo/css'));
});

// Watch
gulp.task('watch', ['build'], function () {
    return gulp.watch('./less/**/*.less', ['build']);
});

// Serve + Watch
gulp.task('dev', ['watch'], function() {
  return gulp.src('demo')
    .pipe(webserver({
        port: 1987,
        livereload: true,
        fallback: 'index.html'
    }));
});
