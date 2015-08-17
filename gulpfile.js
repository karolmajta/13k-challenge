var gulp = require('gulp');
var zip = require('gulp-zip');
var less = require('gulp-less');
var minifycss = require('gulp-minify-css');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var buffer = require('vinyl-buffer');
var browserify = require('browserify');
var connect = require('gulp-connect');


gulp.task('html', function() {
    gulp.src('./src/html/**/*.html')
      .pipe(gulp.dest('./build/uncompressed'))
      .pipe(connect.reload());
});

gulp.task('browserify', function () {
  var b = browserify({
    entries: './src/js/main.js',
    debug: true
  });

  return b.bundle()
    .pipe(source('main.js'))
    .pipe(buffer())
    .pipe(uglify())
    .pipe(gulp.dest('./build/uncompressed/js'))
    .pipe(connect.reload());
});

gulp.task('less', function () {
    return gulp.src('./src/less/**/main.less')
        .pipe(less())
        .pipe(minifycss())
        .pipe(gulp.dest('./build/uncompressed/css'))
        .pipe(connect.reload());
});

gulp.task('compress', ['html', 'browserify', 'less'], function () {
    return gulp.src('./build/uncompressed/**/')
        .pipe(zip('13k-challenge.zip'))
        .pipe(gulp.dest('./build/compressed'));
});

gulp.task('watch', ['build'], function () {
    gulp.watch('./src/html/**/*', ['html']);
    gulp.watch('./src/js/**/*', ['browserify']);
    gulp.watch('./src/less/**/*', ['less']);
});

gulp.task('connect', ['build'], function() {
    connect.server({
        root: './build/uncompressed',
        livereload: true
    });
});


gulp.task('build', ['html', 'browserify', 'less', 'compress']);
gulp.task('default', ['build', 'connect', 'watch']);
