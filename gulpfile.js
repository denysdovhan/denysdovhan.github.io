'use strict';

var gulp        = require('gulp'),
    jade        = require('gulp-jade'),
    data        = require('gulp-data'),
    marked      = require('gulp-marked'),
    rename      = require('gulp-rename'),
    stylus      = require('gulp-stylus'),
    del         = require('del'),
    frontMatter = require('gulp-front-matter'),
    through     = require('through2'),
    each        = require('each-done'),
    path        = require('path');

// Site meta data
var site = require('./package.json').site;

// Array of posts
var posts = [];

// Get summary
function summarize(marker) {
  return through.obj(function (file, enc, cb) {
    // get file's part before marker
    file.data.summary = file.contents.toString().split(marker)[0];
    this.push(file);
    cb();
  });
}

// Function that collects all posts
function collect() {
  return through.obj(function (file, enc, cb) {
    // get url and content from file
    file.data.url = path.basename(file.path, path.extname(file.path));
    file.data.content = file.contents.toString();
    // push into posts' array
    posts.push(file.data);
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
      .pipe(summarize('<!-- more -->'))
      .pipe(collect());
});

// Render all posts
gulp.task('render', ['clean', 'collect'], function (done) {
  each(posts, function (post) {
    return gulp.src('layout/post.jade')
      .pipe(data(post))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: post.url, basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

// Render styles
gulp.task('styles', function () {
  return gulp.src(['styles/*','!styles/_*'])
      .pipe(stylus())
      .pipe(gulp.dest('dist/styles'));
});

// Render index page
gulp.task('index', ['collect'], function () {
  return gulp.src('layout/index.jade')
    .pipe(data({ site: site, posts: posts }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist'));
});

// Clean dist
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});
