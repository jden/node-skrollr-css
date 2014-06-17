# skrollr-css
write [skrollr animations](https://github.com/Prinzhorn/skrollr) in a css-like syntax

a command-line tool

## installation

    $ npm install -g skrollr-css


## usage
```console
skrollr-css [source file?] [-o out file] [-w watch]'
  -v  version
  -h  this help text
```
Supports stdin and stdout, or specify files as arguments

## Syntax

Write [skrollr](https://github.com/Prinzhorn/skrollr) animations like css keyframes!

```html
<div id="a" data-0="font-size: 10px" data-30="font-size: 15px" data-100="font-size: 12px"></div>
```

becomes

```css
@keyframes a {
  0 {
    font-size: 10px;
  }
  30 {
    font-size: 15px;
  }
  100 {
    font-size: 12px;
  }
}
```

This utility builds the animation into a javascript file which you can include with your webpage - run this after `DOM ready` but before `skrollr.init()`.

For example, after running `$ skrollr-css src.css animation.js`, add this to your webpage:
```html
<script src="animation.js"></script>
```

## api

```js
var skrollrCss = require('skrollr-css-')
var css = // ... a css string

var animation = skrollrCss(css)
// a built javascript source string which will set the
// animation data properties in the DOM
```



## running the tests

there aren't any

## contributors

- jden <jason@denizac.org>


## license

ISC. (c) MMXIV jden <jason@denizac.org>. See LICENSE.md
