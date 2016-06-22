# Blackboxing in Chrome DevTools

_22 Jun 2016_

Curently, I'm working on simple React/Redux application. I have Webpack bundler with hot reloading and some dependencies. At this point, debugging of this application bacame a little bit hard to understand.

I mean, when you are debugging such applications almost in every case you will jump stack into a source code of a library you use (in my case it's React). If you're using hot module replacement, then you go through the logic of HMR. That's not okay. We don't want to travel these Nine circles of Hell.

You're happy man if you use Chrome DevTools (if you don't, you [definitely should try][devtools]). There is a cool feature called _“Blackboxing”_. Blackboxing gives you a way to denote library code so that the debugger can route around it. When you blackbox a source file, the debugger will not jump into that file when stepping through code you're debugging.

There is a [cool article about blackboxing on Chrome Developer Tools site][blackboxing]. It's easy to right-click on the file that want to blackbox, but we coudn't do this if our script on the development server, or bundled with Webpack. The solution for me is to make a pattern of files which must be blackboxed.

Just hit the `F1` to open Settings and chose the “Blackboxing” tab:

![](http://i.imgur.com/nO0MwnK.png)

Here we can define scripts that you would like to add to the blacklist in couple of ways:

* filename of script
* folders that contains scripts
* or regular explession to target specific scripts

Pesonally, I use these patterns:

* `\.min\.js$` — for all minified sources
* `node_modules` and `bower_component` — for dependencies
* `~` — home for dependecies in Webpack bundle
* `bundle.js` — it's a bundle itself (we use sourcemaps, don't we?)
* `\(webpack\)-hot-middleware` — HMR

This way works well for me, but if you have any better ideas I'll be grateful to get know about it.

Thank you for reading!

<!-- References -->

[devtools]: https://developers.google.com/web/tools/chrome-devtools/
[blackboxing]: https://developer.chrome.com/devtools/docs/blackboxing
