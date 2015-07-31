'use strict';

var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    marked      = require('gulp-marked'),
    stylus      = require('gulp-stylus'),
    frontMatter = require('gulp-front-matter'),
    through     = require('through2'),
    path        = require('path');


var posts = [];
function collect() {
  return through.obj(function (file, enc, cb) {
    file.data.url = 'posts/' + path.basename(file.path, '.md');

    posts.push({
      data: file.data,
      content: file.contents.toString()
    });

    this.push(file);
    cb();
  },
  function (cb) {
    posts.sort(function (a, b) {
      return b.date - a.date;
    });
    cb();
  });
}


gulp.task('posts', function () {
  return gulp.src('posts/*.md')
      .pipe(frontMatter({
        property: 'data',
        remove: true
      }))
      .pipe(marked())
      .pipe(collect())
      .pipe(gulp.dest('dist'));
});


gulp.task('styles', function () {
  return gulp.src(['styles/*','!jstyles/_*'])
      .pipe(stylus())
      .pipe(gulp.dest('dist/styles'));
});
