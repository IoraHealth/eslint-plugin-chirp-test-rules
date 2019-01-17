# Depcrecated j-query based "click" function (no-jquery-click)

As we refactor the "click" function, we may have instances where a single test file contains both the deprecated j-query version, and the new ember-native-dom based version.  This lint rule is meant to raise any instances of the depcreated version.

## Rule Details

This rule aims to...

Examples of **incorrect** code for this rule:

```js
const el = click(".selector");
```

```js
const el = click(".selector").text();
```

```js
import { click as x } from "ember-native-dom-helpers";
const el = click(".selector");
```

```js
import { click as x } from "ember-native-dom-helpers";
const el = click(".selector").text();
```

```js
expect(click(".selector")).to.be.ok;
```

```js
expect(click(".selector").text()).to.be.ok;
```

```js
import { click as x } from "ember-native-dom-helpers";
expect(click(".selector")).to.be.ok;
```

```js
import { click as x } from "ember-native-dom-helpers";
expect(click(".selector").text()).to.be.ok;
```

Examples of **correct** code for this rule:

```js
import { click } from "ember-native-dom-helpers";
const el = click(".selector");
```

```js
import { click as blah } from "ember-native-dom-helpers";
const el = blah(".selector");
```

```js
import { click } from "ember-native-dom-helpers";
const el = click(".selector").text();
```

```js
import { click as blah } from "ember-native-dom-helpers";
const el = blah(".selector").text();
```

```js
import { click } from "ember-native-dom-helpers";
expect(click(".selector")).to.be.ok;
```

```js
import { click as blah } from "ember-native-dom-helpers";
expect(blah(".selector")).to.be.ok;
```

```js
import { click } from "ember-native-dom-helpers";
expect(click(".selector").text()).to.be.ok;
```

```js
import { click as blah } from "ember-native-dom-helpers";
expect(blah(".selector").text()).to.be.ok;
```
