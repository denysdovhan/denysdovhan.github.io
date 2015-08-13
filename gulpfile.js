'use strict';

var gulp         = require('gulp'),
    jade         = require('gulp-jade'),
    data         = require('gulp-data'),
    marked       = require('gulp-marked'),
    rename       = require('gulp-rename'),
    stylus       = require('gulp-stylus'),
    frontMatter  = require('gulp-front-matter'),

    fs           = require('fs'),
    del          = require('del'),
    rss          = require('rss'),
    through      = require('through2'),
    deploy       = require('gulp-gh-pages'),
    moment       = require('moment'),
    each         = require('each-done'),
    path         = require('path'),

    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

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
    file.data.date = moment(file.data.date).format('D MMM YYYY');
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
gulp.task('collect', ['clean'], function () {
  posts = [];
  return gulp.src('posts/*.md')
      .pipe(frontMatter({ property: 'data', remove: true }))
      .pipe(marked())
      .pipe(summarize('<!-- more -->'))
      .pipe(collect());
});

// Render all posts
gulp.task('posts', ['collect'], function (done) {
  each(posts, function (post) {
    return gulp.src('layout/post.jade')
      .pipe(data({ site: site, post: post }))
      .pipe(jade({ pretty: true }))
      .pipe(rename({ dirname: post.url, basename: 'index' }))
      .pipe(gulp.dest('dist'));
  }, done);
});

// Render styles
gulp.task('styles', ['clean'], function () {
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

// Create RSS
gulp.task('rss', ['index'], function () {
  var feed = new rss(site);

  posts.forEach(function (post) {
    feed.item({
      title: post.title,
      description: post.summary,
      url: site.site_url + post.url,
      author: site.author,
      date: post.date
    });
  });

  var xml = feed.xml({ indent: true });

  fs.writeFile('dist/rss.xml', xml, { encoding: 'utf-8' }, function (err) {
    if (err) { throw err; }
  });
});

// Put CNAME file into dist
gulp.task('cname', ['clean'], function () {
  return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

// Clean dist
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Build task
gulp.task('build', ['clean', 'posts', 'index', 'rss', 'styles', 'cname']);

// Deploy task
gulp.task('deploy', ['build'], function () {
  return gulp.src('dist/**/*')
    .pipe(deploy({
      branch: 'master',
      push: false,
      message: 'Update ' + moment().format('lll')
    }));
});

// Watch task
gulp.task('watch', ['build'], function () {
  browserSync({
    server: './dist',
    notify: false,
    debugInfo: false,
    host: 'localhost'
  });

  // watch changes in styles, layout and posts
  gulp.watch(['styles/**/*.{styl,stylus}'], ['styles']);
  gulp.watch(['layout/**/*.jade', 'posts/*.md'], ['posts', 'index']);

  // emmit reloading
  gulp.watch('dist/**/*.{html,css}').on('change', reload);
});

// Default task
gulp.task('default', ['watch']);
