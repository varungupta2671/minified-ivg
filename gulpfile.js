'use strict';

var csso = require('gulp-csso');
var del = require('del');
var gulp = require('gulp');
var htmlmin = require('gulp-htmlmin');
var uglify = require('gulp-uglify');
var sass = require('gulp-sass');

  // Clean output directory
gulp.task('clean', gulp.series(() => del(['dist'])));

  // Gulp task to minify CSS files
gulp.task('styles', gulp.series('clean', function () {
    return gulp.src('./src/css/style.css')
      // Minify the file
      .pipe(csso())
      // Output
      .pipe(gulp.dest('./dist/css'))
  }));

  // Gulp task to minify JavaScript files
gulp.task('scripts', gulp.series('clean', function() {
    return gulp.src('./src/js/**/*.js')
      // Minify the file
      .pipe(uglify())
      // Output
      .pipe(gulp.dest('./dist/js'))
  }));

  // Gulp task to minify HTML files
gulp.task('pages', gulp.series('clean', function() {
    return gulp.src(['./src/**/*.html'])
      .pipe(htmlmin({
        collapseWhitespace: true,
        removeComments: true
      }))
      .pipe(gulp.dest('./dist'));
  }));

// Gulp task to minify all files
gulp.task('default', gulp.series('styles', 'scripts', 'pages'));
