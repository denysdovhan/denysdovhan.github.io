# Building pull requests differently using Travis CI

_19 Aug 2015_

Sometimes you need to run differently tests for pull requests on [Travis CI][travis-ci]. In this post I'm going to explain how you can do this.

<!-- more -->

At first, you must should ensure «Build pull requests» option is enabled Travis' settings page:

![Build pull requests](http://i.imgur.com/SoBfEWG.png)

If all right, let us try to add specific test for pull requests.

## Restrictions when testing PR

Travis [give us opportunity][restrictions-pr] to run different tests only to situations where pull requests entirely. It provide us to access the environment variable `${TRAVIS_PULL_REQUEST}` is set to `false` when the build is for a normal branch commit. When the build is for a pull request, it will contain the pull request’s number.

Below is an example form `.travis.yml` that runs `npm test` for regular build and `npm run pull-test` for pull requests.

```yaml
script:
- '[ "${TRAVIS_PULL_REQUEST}" = "false" ] && npm test || npm run pull-test'
```

That's a bash condition that check if `${TRAVIS_PULL_REQUEST}` equals `false` and run different tasks depends on value.

## Conclusion

Use this when you wanna testing pull request in other way than regular branch. I use this approach for deploying this site after every commit and just test build for pull requests. [Check out][travis-yml] my `.travis.yml` for more.


[travis-ci]: https://travis-ci.org
[restrictions-pr]: http://docs.travis-ci.com/user/pull-requests/#Security-Restrictions-when-testing-Pull-Requests
[travis-yml]: https://github.com/denysdovhan/denysdovhan.github.io/blob/premaster/.travis.yml#L12
