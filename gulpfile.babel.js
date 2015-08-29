import gulp         from 'gulp';
import jade         from 'gulp-jade';
import data         from 'gulp-data';
import rename       from 'gulp-rename';
import stylus       from 'gulp-stylus';
import extract      from 'article-data';
import fs           from 'fs';
import path         from 'path';
import del          from 'del';
import rss          from 'rss';
import through      from 'through2';
import deploy       from 'gulp-gh-pages';
import sequence     from 'run-sequence';
import assign       from 'object-assign';
import moment       from 'moment';
import each         from 'each-done';
import browserSync  from 'browser-sync';

// Site meta data
const site = require('./package.json').site;

// Array of posts
let posts = [];

// Function that collects all posts
const collect = () =>
  through.obj(
    (file, enc, cb) => {
      posts.push(assign({
        filename: file.relative,
        url: path
              .basename(file.relative, path.extname(file.relative))
              .substr(11)
      }, extract(file.contents.toString(), 'D MMM YYYY', 'en')));
      cb(null, false);
    },
    (cb) => {
      posts.sort((a,b) => b.date.unix - a.date.unix);
      cb();
    }
  );

// Post renderer
const render = (post) =>
  gulp.src('layout/post.jade')
    .pipe(data({ site: site, post: post }))
    .pipe(jade({ pretty: true }))
    .pipe(rename({ dirname: post.url, basename: 'index' }))
    .pipe(gulp.dest('dist'));

// Collect all posts
gulp.task('collect', () => {
  posts = [];
  return gulp.src('posts/*.md')
    .pipe(collect());
});

// Render all posts
gulp.task('posts', ['collect'], (done) => { each(posts, render, done); });

// Render styles
gulp.task('styles', () =>
  gulp.src(['styles/*','!styles/_*'])
    .pipe(stylus())
    .pipe(gulp.dest('dist/styles'))
);

// Render index page
gulp.task('index', ['collect'], () =>
  gulp.src('layout/index.jade')
    .pipe(data({ site: site, posts: posts }))
    .pipe(jade({ pretty: true }))
    .pipe(gulp.dest('dist'))
);

// Create RSS
gulp.task('rss', ['index'], () => {
  let feed = new rss(site);

  posts.forEach((post) => {
    feed.item({
      title: post.title,
      description: post.summary,
      url: site.site_url + post.url,
      author: site.author,
      date: post.date
    });
  });

  const xml = feed.xml({ indent: true });

  fs.writeFile('dist/rss.xml', xml, { encoding: 'utf-8' }, (err) => {
    if (err) { throw err; }
  });
});

// Put CNAME file into dist
gulp.task('cname', () => gulp.src('CNAME').pipe(gulp.dest('dist')));

// Clean dist
gulp.task('clean', (cb) => del(['dist'], cb));

// Build task
gulp.task('build', (cb) =>
  sequence('clean', ['posts', 'index', 'rss', 'styles', 'cname'], cb)
);

// Deploy task
gulp.task('deploy', ['build'], () =>
  gulp.src('dist/**/*')
    .pipe(deploy({
      branch: 'master',
      push: true,
      message: 'Update ' + moment(new Date()).format('lll')
    }))
);

// Watch task
gulp.task('watch', ['build'], () => {
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
  gulp.watch('dist/**/*.{html,css}').on('change', browserSync.reload);
});

// Default task
gulp.task('default', ['watch']);
