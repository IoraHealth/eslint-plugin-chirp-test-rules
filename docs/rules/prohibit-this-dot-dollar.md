# Don&#39;t allow this.$(...) construction to be used.

This is part of an effort to remove deprecated j-query from our test suite.


## Rule Details

Examples of **incorrect** code for this rule:

```js

it('calls the function directly', function() {
  expect(this.$()).to.contain('hello world');
});

it('saves the value as a variable', function() {
  const el = this.$("hello");
});

it("tries to get around the restriction", function() {
  expect(this['$'].text()).to.contain('');
});

```

Examples of **correct** code for this rule:

```js

it("saves 'this' as another variable, please don't do this", function() {
  const context = this;
  expect(context.$()).to.be.ok;
});

```
