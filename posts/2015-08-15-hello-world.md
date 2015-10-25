# Hello, World! Again.

15 Aug 2015

Hi everyone! Today I proud to present my personal blog! Again.

Yep, that's right. You heard correctly. This isn't the first time when I present my blog. But today it is going to be special.

<!-- more -->

It will be special just because:

* It's **_open source_** — so now you can improve it and help me to fix mistakes.
* It's **_static_** — so this is convenient for me, superfast and hosted on [GitHub Pages][gh-pages].
* It's **_habitual_** — because it has been built using familiar tools, like Gulp, Jade, Markdown and Travis.

## Looking behind

My first blog had been built on [WordPress][wordpress]. It was convenient, but WordPress was too bulky for me. I needed just blog. Without widgets, without plugins, without themes. I needed just some pages, with minimalistic, but readable design. Then I've lost my domain and forgot about these problems.

I've already mentioned that about five months ago and decided to create perfect, slap-up site using modern technologies. But I didn't have time to do this and left this idea again

Recently I've stumbled on interesting article by [Vladimir Starkov][starkov] called [«Minimum viable blog»][mvb] or «MVB». The important idea is:

> You should have ability to write it, readers — to read it. Content is a king. Spend time on writing, not on developing.

And that's what I need.

## Through thorns to here

I've decided to make my blog _static_. Why? Just because it's fast, easy and can be hosted on [GitHub][gh-pages]. There are [too many static site generators][staticgen], but how to choose suitable?

At first, I was trying to write my own MVB theme for [Hexo][hexo], but it's not for me. I wanna more freedom and Hexo restricts me, so I've made new branch and been trying to rewrite blog using [Metalsmith][metalsmith]. It proved to be better, more flexible but still not what was necessary.

I thought, if I needed this flexibility, why if I'd write everything on [Gulp][gulp]?

So now my blog is written using Gulp, Jade, Stylus (with BEM) and Markdown. And that's enough for me — this is just working.

## Language

Few words about language.

I've written the blog in Ukrainian before, however now I have more followers who don't know Ukrainian. So I write in English.

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
