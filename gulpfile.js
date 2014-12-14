var gulp = require('gulp');
var less = require('gulp-less');
var sourcemaps = require('gulp-sourcemaps');
var minifyCSS = require('gulp-minify-css');
var autoprefixer = require('gulp-autoprefixer');
var gutil = require('gulp-util');
var webserver = require('gulp-webserver');
var plumber = require('gulp-plumber');
var size = require('gulp-size');

var browserify = require('browserify');
var buffer = require('vinyl-buffer');
var source = require('vinyl-source-stream');
var uglify = require('gulp-uglify');

function handleErrors() {
    return plumber({
        errorHandler: function onError(err) {
            gutil.log(gutil.colors.red(err));
            gutil.beep();
            this.emit('end');
        }
    });
}

gulp.task('js', function () {
    var browserified = browserify('./js/demo.js', {
        debug: true,
        transform: ['reactify']
    });

    return browserified
        .bundle()
        .pipe(handleErrors())
        .pipe(source('demo.js'))
        .pipe(buffer())
        .pipe(sourcemaps.init({loadMaps: true}))
        .pipe(uglify())
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest('./demo/js'));
});


gulp.task('less', function() {
    return gulp.src('./less/makerui.less')
        .pipe(handleErrors())
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

gulp.task('build', ['js', 'less']);

// Watch
gulp.task('watchLess', ['less'], function () {
    return gulp.watch('./less/**/*.less', ['less']);
});
gulp.task('watchJs', ['js'], function () {
    return gulp.watch('./js/**/*.js', ['js']);
});

// Serve + Watch
gulp.task('dev', ['watchLess', 'watchJs'], function() {
  return gulp.src('demo')
    .pipe(webserver({
        port: 1987,
        livereload: true,
        fallback: 'index.html'
    }));
});
