---
title: Hello, World! Again.
date: 14 Aug 2015
---

Hi everyone! Today I proud to present my personal blog! Again.

Yep, that's right. You heard correctly. This isn't first time that I present my blog. But today it will be special.

<!-- more -->

It will be special just because:

* It's **_open source_** — so now you can improve this and help me fix mistakes.
* It's **_static_** — so this is convenient for me, superfast and hosted on [GitHub Pages][gh-pages].
* It's **_habitual_** — because it has built using familiar tools, like Gulp, Jade, Markkdown and Travis.

## Looking behind

My first blog had built on [WordPress][wordpress]. It was convenient, but WordPress was too fat for me. I need just blog. Without widgets, without plugins, without themes. I need just some pages, with minimalistic, but readable design. Then I've lost my domain and forget about these problems.

I've mentioned this about five months ago and decided to make perfect, slap-up site using modern technologies. But I haven't had time to do this and again left this idea.

Recently I've stumbled on interesting article by [Vladimir Starkov][starkov] called [«Minimum viable blog»][mvb] or «MVB». The important idea of that is:

> You should have ability to write it, readers — to read it. Content is a king. Spend time on writing, not on developing.

And that's what I need.

## Through thorns to here

I decided make my blog _static_. Why? Just because it's fast, easy and can be hosted on [GitHub][gh-pages]. There is [to many static site generators][staticgen], but how to choose suitable?

At first, I was trying to write my own MVB theme for [Hexo][hexo], but it's not for me. I wanna more freedom and Hexo restricts me, so I've made new branch and been trying to rewrite blog using [Metalsmith][metalsmith]. It's been better, more flexible but still not that necessary.

I've thought, if I need this flexibility, why if I'd write everything on [Gulp][gulp]?

So now my blog is written using Gulp, Jade, Stylus (with BEM) and Markdown. And that's enough for me — this is just working.

## Language

Few words about language.

I've written Ukrainian blog before, however now I have more followers don't understand Ukrainian. So I write in English.

Of course, my English is not perfect, so if you find a mistake, please, click «edit on github», fix mistake and send me a pull request. I will be grateful!

## Conclusion

Now my blog is working again and this is amazing.

You can look at [sources on GitHub][repo] — they are available for everyone. Also don't forget to [subscribe to RSS][feed] feed and don't miss any new post.

So _Hello, World_! Again.

**P.S.** Besides, I am very grateful to [Vladimir Starkov][starkov] for helping with Gulp and Travis CI.

[gh-pages]: https://pages.github.com/
[wordpress]: https://wordpress.org/
[starkov]: https://iamstarkov.com/
[mvb]: https://iamstarkov.com/mvb/
[staticgen]: https://www.staticgen.com/
[hexo]: https://hexo.io/
[metalsmith]: http://www.metalsmith.io/
[gulp]: http://gulpjs.com/
[repo]: https://github.com/denysdovhan/denysdovhan.github.io
[feed]: /rss.xml
