# Depcrecated j-query based "find" function (no-jquery-find)

As we refactor the "find" function, we may have instances where a single test file contains both the deprecated j-query version, and the new ember-native-dom based version.  This lint rule is meant to raise any instances of the depcreated version.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
const el = find(".selector");
```

```js
const el = find(".selector").text();
```

```js
import { find as x } from "ember-native-dom-helpers";
const el = find(".selector");
```

```js
import { find as x } from "ember-native-dom-helpers";
const el = find(".selector").text();
```

```js
expect(find(".selector")).to.be.ok;
```

```js
expect(find(".selector").text()).to.be.ok;
```

```js
import { find as x } from "ember-native-dom-helpers";
expect(find(".selector")).to.be.ok;
```

```js
import { find as x } from "ember-native-dom-helpers";
expect(find(".selector").text()).to.be.ok;
```

Examples of **correct** code for this rule:

```js
import { find } from "ember-native-dom-helpers";
const el = find(".selector");
```

```js
import { find as blah } from "ember-native-dom-helpers";
const el = blah(".selector");
```

```js
import { find } from "ember-native-dom-helpers";
const el = find(".selector").text();
```

```js
import { find as blah } from "ember-native-dom-helpers";
const el = blah(".selector").text();
```

```js
import { find } from "ember-native-dom-helpers";
expect(find(".selector")).to.be.ok;
```

```js
import { find as blah } from "ember-native-dom-helpers";
expect(blah(".selector")).to.be.ok;
```

```js
import { find } from "ember-native-dom-helpers";
expect(find(".selector").text()).to.be.ok;
```

```js
import { find as blah } from "ember-native-dom-helpers";
expect(blah(".selector").text()).to.be.ok;
```
