'use strict';

var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    data        = require('gulp-data'),
    marked      = require('gulp-marked'),
    rename      = require('gulp-rename'),
    stylus      = require('gulp-stylus'),
    frontMatter = require('gulp-front-matter'),
    through     = require('through2'),
    each        = require('each-done'),
    path        = require('path');


var posts = [];
function collect() {
  return through.obj(function (file, enc, cb) {
    file.data.url = path.basename(file.path, path.extname(file.path));

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

// Collect all posts
gulp.task('collect', function () {
  posts = [];
  return gulp.src('posts/*.md')
      .pipe(frontMatter({ property: 'data', remove: true }))
      .pipe(marked())
      .pipe(collect());
});

// Render all posts
gulp.task('render', ['collect'], function (done) {
  each(posts, function (post) {
    return gulp.src('layout/post.jade')
      .pipe(data(post))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: post.data.url, basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

// Render styles
gulp.task('styles', function () {
  return gulp.src(['styles/*','!jstyles/_*'])
      .pipe(stylus())
      .pipe(gulp.dest('dist/styles'));
});
