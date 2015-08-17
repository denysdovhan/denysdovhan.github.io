# Blog from Denys Dovhan [![Build Status][travis-bange]][travis-link]

> My awesome static blog.

Here is my blog about front-end technologies, design, JavaScript, HTML/CSS, etc. This is cool because:

* It's _open source_ — so you can improve this and fix mistakes.
* It's _static_ — so it's convenient for me, superfast and hosted on [GitHub Pages][gh-pages].
* It's _habitual_ — 'cause build using familiar tools, like Gulp, Jade, Markkdown and Travis.

## Instalation

If you want fix mistakes or propose changes, you can clone this repo and install dependencies using following command:

```bash
git clone https://github.com/denysdovhan/denysdovhan.github.io.git && cd denysdovhan.github.io && npm i
```

Also don't forget that you can easily download it and read offline.

## Tasks

I've mentioned that this site has builded using Gulp, so you could use these common tasks:

* `gulp` — alias for `gulp watch`.
* `gulp watch` — build and run local server with live-reload.
* `gulp build` — build site into `dist/` folder.
* `gulp deploy` — rebuild `master` using `dist/` and push to `origin`.

Also there are these specified tasks:

* `gulp collect` — collect all posts from `posts/` into `posts` variable.
* `gulp posts` — render all posts using `posts` variable and `layout/post.jade`.
* `gulp index` — render index-page using. `layout/index.jade`.
* `gulp styles` — render styles from `styles/`.
* `gulp rss` — render feed using `posts` variable.
* `gulp cname` — just put `CNAME` file into `dist` folder.
* `gulp clean` — clear `dist/` folder.

And of course look at **npm**-scripts:

* `npm start` — alias for `gulp watch`
* `npm build` — alias for `gulp build`
* `npm deploy` — alias for `gulp deploy`

## To-do

* [x] Fix Travis CI for pull requests.
* [x] Fix relative font-size.
* [ ] Add pagination.
* [ ] Migrate to ES2015 (Babel).
* [ ] Get rid of front-matter.

## License

[MIT][mit-license] © [Denys Dovhan][denysdovhan]

[travis-bange]: https://travis-ci.org/denysdovhan/denysdovhan.github.io.svg?branch=premaster
[travis-link]: https://travis-ci.org/denysdovhan/denysdovhan.github.io
[gh-pages]: https://pages.github.com/
[mit-license]: http://opensource.org/licenses/MIT
[denysdovhan]: http://denysdovhan.com/
