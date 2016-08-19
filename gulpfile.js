const gulp     = require('gulp');
const plumber  = require('gulp-plumber');
const pug      = require('gulp-pug');
const put      = require('gulp-data');
const rename   = require('gulp-rename');
const stylus   = require('gulp-stylus');
const extract  = require('article-data');
const fs       = require('fs');
const path     = require('path');
const del      = require('del');
const rss      = require('rss');
const through  = require('through2');
const deploy   = require('gulp-gh-pages');
const moment   = require('moment');
const remark   = require('remark');
const textr    = require('remark-textr');
const base     = require('typographic-base');
const each     = require('each-done');
const BS       = require('browser-sync');

const pkg         = require('./package');
const browserSync = BS.create();

// Amount of posts on page
const perPage = 5;

// Array of posts
let posts = [];

// Typographing
const typo = input =>
  remark()
    .use(textr, { plugins: [ base ], options: { locale: 'en-us' } })
    .process(input)
    .toString();

// Function that collects all posts
const collect = () =>
  through.obj(
    (file, enc, cb) => {
      posts.push(Object.assign({
        filename: file.relative,
        url: '/' + path
              .basename(file.relative, path.extname(file.relative))
              .substr(11)
      }, extract(
        typo(file.contents.toString()),
        'D MMM YYYY', 'en'
      )));
      cb(null, false);
    },
    (cb) => {
      posts = posts
        .filter(x => !!x.date)
        .filter(x => !!x.title)
        .filter(x => !!x.desc)
        .sort((a,b) => b.date.unix - a.date.unix);
      cb();
    }
  );

// Page renderer
const render = (layout, data, url) =>
  gulp.src(layout)
    .pipe(plumber())
    .pipe(put(Object.assign({ site: pkg.site }, data)))
    .pipe(pug({ pretty: true }))
    .pipe(rename({ dirname: url, basename: 'index' }))
    .pipe(gulp.dest('dist'));

// Collect all posts
gulp.task('collect', () => {
  posts = [];
  return gulp.src(['posts/*.md', '!posts/_*'])
    .pipe(collect());
});

// Render all posts
gulp.task('posts', (cb) => {
  each(posts, post => render('layout/post.pug', { post }, post.url), cb);
});

// Render index page
gulp.task('index', () => {
  let promises = [];
  let onPage = [];
  let page = 1;

  posts.forEach((post, i) => {
    onPage.push(post);
    i++;

    if (i % perPage == 0 || i == posts.length) {
      promises.push(new Promise((resolve, reject) => {
        render('layout/index.pug', {
          posts: onPage,
          prevPage: page-1 != 0 ? (page-1 == 1) ? '/':`/page/${page-1}` : false,
          nextPage: page*perPage < posts.length ?     `/page/${page+1}` : false
        }, page != 1 ? `/page/${page}` : '/')
          .on('error', reject)
          .on('end', resolve);
      }));
      onPage = [];
      page++;
    }
  });

  return Promise.all(promises);
});

// Render styles
gulp.task('styles', () =>
  gulp.src('styles/main.styl')
    .pipe(plumber())
    .pipe(stylus())
    .pipe(gulp.dest('dist/styles'))
    .pipe(browserSync.stream())
);

// Create RSS
gulp.task('rss', (cb) => {
  const site = pkg.site;
  let feed = new rss(pkg.site);

  posts.forEach((post) => {
    feed.item({
      title: post.title.text,
      description: post.desc.text,
      url: site.site_url + post.url,
      author: site.author,
      date: post.date.text
    });
  });

  const xml = feed.xml({ indent: true });

  fs.writeFile('dist/rss.xml', xml, { encoding: 'utf-8' }, (err) => {
    if (err) { throw err; }
    cb();
  });
});

// Put CNAME file into dist
gulp.task('copy', () => gulp.src('{CNAME,favicon*}').pipe(gulp.dest('dist')));

// Clean dist
gulp.task('clean', (cb) => del(['dist'], cb));

// Render layout
gulp.task('layout', gulp.series(
  'collect',
  gulp.parallel('posts', 'index')
));

// Build task
gulp.task('build', gulp.series(
  'clean',
  'layout',
  'rss',
  gulp.parallel('styles', 'copy')
));

// Deploy task
gulp.task('deploy', gulp.series('build', () =>
  gulp.src('dist/**/*')
    .pipe(deploy({
      branch: 'master',
      push: true,
      message: `Update ${moment(new Date()).format('lll')}`
    }))
));

// Watch task
gulp.task('watch', () => {
  browserSync.init({
    server: 'dist'
  });
  // watch changes in styles, layout and posts
  gulp.watch('styles/**/*', gulp.series('styles'));
  gulp.watch('**/*.{pug,md,json}', gulp.series('layout', 'rss'));

  browserSync.watch('dist/**/*.*').on('change', browserSync.reload);
});

// Run server
gulp.task('serve', gulp.series(
  'build',
  'watch'
));

// Default task
gulp.task('default', gulp.series('serve'));
