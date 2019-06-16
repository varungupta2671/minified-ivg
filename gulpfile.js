'use strict';

var browsersync = require("browser-sync").create();
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var fontmin = require('gulp-fontmin');
var sass = require('gulp-sass');

// Clean output directory
gulp.task('clean', gulp.series(() => del(['dist'])));

// BrowserSync
gulp.task('browserSync', function (done) {
  browsersync.init({
    server: {
      baseDir: "./dist/"
    },
    port: 3000
  });
  done();
});

// BrowserSync Reload
gulp.task('browserSyncReload', function (done) {
  browsersync.reload();
  done();
});

// Gulp task to minify CSS files
gulp.task('styles', function () {
  return gulp.src('./src/css/**/*.css')
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
});

// Gulp task to minify JavaScript files
gulp.task('scripts', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
});

// Gulp task to optimize Images
gulp.task('images', function () {
  return gulp.src("./src/img/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./dist/img"));
});

// Gulp task to optimize fonts
gulp.task('fonts', function () {
  return gulp.src('./src/fonts/**/*.ttf')
      .pipe(fontmin())
      .pipe(gulp.dest('./dist/fonts'));
});

// Gulp task to minify HTML files
gulp.task('pages', function () {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
});

// Gulp task to minify all files
gulp.task('default', gulp.series('clean', 'scripts', 'images', 'styles', 'fonts', 'pages', 'browserSync'));
