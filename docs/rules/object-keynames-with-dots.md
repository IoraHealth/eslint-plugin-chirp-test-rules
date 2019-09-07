# Check if an object literal has any keynames containing a dot. (object-keynames-with-dots)

This rule was written after a bug surfaced in Ember 3.8 where the "each-in" function got screwed up if an object literal contained a key with a string literal that has a dot, such as `{"x.y": 3}`.  This is a very simple check to identify any instances of such notation.


## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js

const OPTIONS = {
  "hello.world": "foo bar"
};

```

Examples of **correct** code for this rule:

```js

const OPTIONS = {
  "hello": {
    "world": "foo bar"
  }
};

```
