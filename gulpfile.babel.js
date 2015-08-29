'use strict';

var gulp         = require('gulp'),
    jade         = require('gulp-jade'),
    data         = require('gulp-data'),
    rename       = require('gulp-rename'),
    stylus       = require('gulp-stylus'),
    extract      = require('article-data'),

    fs           = require('fs'),
    del          = require('del'),
    rss          = require('rss'),
    through      = require('through2'),
    deploy       = require('gulp-gh-pages'),
    sequence     = require('run-sequence'),
    assign       = require('object-assign'),
    moment       = require('moment'),
    each         = require('each-done'),
    path         = require('path'),

    browserSync  = require('browser-sync'),
    reload       = browserSync.reload;

// Site meta data
var site = require('./package.json').site;

// Array of posts
var posts = [];

// Function that collects all posts
function collect() {
  return through.obj(function (file, enc, cb) {
    posts.push(assign({
      filename: file.relative,
      url: path.basename(file.relative, path.extname(file.relative)).substr(11)
    }, extract(file.contents.toString(), 'D MMM YYYY', 'en')));
    cb(null, file);
  }, function (cb) {
    posts.sort(function (a, b) {
      return b.date.unix - a.date.unix;
    });
    cb();
  });
}

// Collect all posts
gulp.task('collect', function () {
  posts = [];
  return gulp.src('posts/*.md')
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
gulp.task('cname', function () {
  return gulp.src('CNAME').pipe(gulp.dest('dist'));
});

// Clean dist
gulp.task('clean', function (cb) {
  del(['dist'], cb);
});

// Build task
gulp.task('build', function (cb) {
  sequence('clean', ['posts', 'index', 'rss', 'styles', 'cname'], cb);
});

// Deploy task
gulp.task('deploy', ['build'], function () {
  return gulp.src('dist/**/*')
    .pipe(deploy({
      branch: 'master',
      push: true,
      message: 'Update ' + moment(new Date()).format('lll')
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
  gulp.watch(['styles/**/*'], ['styles']);
  gulp.watch(['**/*.{jade,md}'], ['index', 'posts']);

  // emmit reloading
  gulp.watch('dist/**/*.{html,css}').on('change', reload);
});

// Default task
gulp.task('default', ['watch']);
