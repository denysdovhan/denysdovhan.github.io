# Atom's One for GNOME Terminal is out

_23 Aug 2015_

[![One Dark Terminal](http://i.imgur.com/O0VJ00Z.png)][gnome-terminal-one]

I like GitHub's [Atom][atom] editor. It's really cool tools that makes my life easier. Atom has great [One Dark][one-dark] and [One Light][one-light] themes out of box.

However I like GNOME too and use default gnome-terminal with my [dotfiles][dotfiles]. That's a great work environment for me.

I've been using [Solarized][solarized] theme for terminal as default for a long time:

![Atom & Solarized Terminal](http://i.imgur.com/rNzNlYx.png)

As you can see above, when you use different themes in editor and terminal, you'll always feel confused after switching each other.

Thus I decided to use One Dark theme in terminal too. Unfortunately, there isn't One Dark theme for gnome-terminal. So, I've written One Dark and One Light theme for GNOME Terminal and now it looks great:

![Atom & One Terminal](http://i.imgur.com/m0ylgAX.png)

These themes use [color palette][palette] from original One syntax theme.

## Installation

For installation just execute desired command below. Be careful, terminal will be closed after install.

**One Dark**

```
wget https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-dark.sh && . one-dark.sh
```

**One Light**

```
wget https://raw.githubusercontent.com/denysdovhan/gnome-terminal-one/master/one-light.sh && . one-light.sh
```

## Fonts

Also, I recommend to use [Inconsolata (only latin)][inconsolata] or [Fira Mono][fira-mono] fonts for better compatibility with Atom Editor.

## Conclusion

So, now perfect One Light and One Dark themes available on GitHub. Check out [gnome-terminal-one][gnome-terminal-one] repo.


[gnome-terminal-one]: https://github.com/denysdovhan/one-gnome-terminal
[atom]: https://atom.io/
[one-dark]: https://atom.io/themes/one-dark-syntax
[one-light]: https://atom.io/themes/one-light-syntax
[dotfiles]: https://github.com/denysdovhan/dotfiles
[solarized]: http://ethanschoonover.com/solarized
[palette]: https://github.com/denysdovhan/gnome-terminal-one/blob/master/COLORS
[inconsolata]: https://www.google.com/fonts/specimen/Inconsolata
[fira-mono]: https://github.com/mozilla/Fira
