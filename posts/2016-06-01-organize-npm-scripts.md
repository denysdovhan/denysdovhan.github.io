# How do you organize your npm-scripts?

_1 Jun 2016_

> This post isn't explanation. This is a question.

Many people say that [gulp], [grunt] and other build systems are overkills and we should just use simple npm-scripts. That's reasonable, but there is a problem of organizing npm-scripts.

What am I talking about? Well, here is an example of npm scripts:

<script src="https://gist.github.com/denysdovhan/d8b8cd52356a88c1afed41548f6510ce.js"></script>

As you may noticed, it's hard to understand all of this complex commands. So when you start to use too many specific flags or agruments of your command, your npm-script became ugly.

What the solution? Unfortunately, I don't know. However, I have some ideas.

## better-npm-run

The simplest way to make your commands a little bit simpler is using of [better-npm-run] package. This package give us opportunity to define environment variables in more readable way. By the way it's cross-platform.

Here is an example:

<script src="https://gist.github.com/denysdovhan/b6c6dd27980699ec46cb891b06b4b7e4.js"></script>

## js file

If your npm-script is going to be too complex to understand, just create a javascript file.

In most of cases, the command which is used in npm-script is part of npm package. And this package should have API. It's simple to use this API and implement what you need.

If your script require a specific system command (like `rm`, `mkdir`, etc), feel free to use [`fs` module][fs].

## shell scripts

Another way is good when your command is really complex. Create a `scripts` folder and put there shell scripts for your tasks. 

<script src="https://gist.github.com/denysdovhan/4612b53295be9ca51ac8a50afbe9508c.js"></script>

The benefits of this way:

* Scripts are much more extandable
* `package.json` is kept very simple
* You can define environment variables in your scripts
* You can do almost everything in your scripts

But this solution isn't cross-platform and that's may be a big problem.

## Conclusion

Those solutions may be not good enough, but this is working. I will be glad to hear any other solution, because that's exactly what I'm looking for. So if you have any better idea, please, let me know.

<!-- References -->

[gulp]: http://gulpjs.com/
[grunt]: http://gruntjs.com/
[fs]: https://nodejs.org/api/fs.html
[better-npm-run]: https://www.npmjs.com/package/better-npm-run
