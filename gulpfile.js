'use strict';

var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    marked      = require('gulp-marked'),
    stylus      = require('gulp-stylus'),
    frontMatter = require('gulp-front-matter'),
    through     = require('through2');


gulp.task('posts', function () {
  return gulp.src('posts/*.md')
      .pipe(frontMatter({
        property: 'post',
        remove: true
      }))
      .pipe(marked())
      .pipe(gulp.dest('dist'));
});
