'use strict';

var browsersync = require("browser-sync").create();
var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var imagemin = require("gulp-imagemin");
var newer = require("gulp-newer");
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

// Clean output directory
gulp.task('clean', gulp.series(() => del(['dist'])));

// BrowserSync
gulp.task('browserSync', gulp.series('clean', function (done) {
  browsersync.init({
    server: {
      baseDir: "./src/"
    },
    port: 3000
  });
  done();
}));

// BrowserSync Reload
gulp.task('browserSyncReload', gulp.series('clean', function (done) {
  browsersync.reload();
  done();
}));

// Gulp task to minify CSS files
gulp.task('styles', gulp.series('clean', function () {
  return gulp.src('./src/css/style.css')
    .pipe(csso())
    .pipe(gulp.dest('./dist/css'))
}));

// Gulp task to minify JavaScript files
gulp.task('scripts', gulp.series('clean', function () {
  return gulp.src('./src/js/**/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('./dist/js'))
}));

// Gulp task to optimize Images
gulp.task('images', gulp.series('clean', function () {
  return gulp.src("./src/images/**/*")
    .pipe(imagemin([
        imagemin.gifsicle({ interlaced: true }),
        imagemin.jpegtran({ progressive: true }),
        imagemin.optipng({ optimizationLevel: 5 }),
      ])
    )
    .pipe(gulp.dest("./dist/img"));
}));

// Gulp task to minify HTML files
gulp.task('pages', gulp.series('clean', function () {
  return gulp.src(['./src/**/*.html'])
    .pipe(htmlmin({
      collapseWhitespace: true,
      removeComments: true
    }))
    .pipe(gulp.dest('./dist'));
}));

// Gulp task to minify all files
gulp.task('default', gulp.series('styles', 'scripts', 'images', 'pages', 'browserSync'));
