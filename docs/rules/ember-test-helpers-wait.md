# Deprecated 'wait' ember test helper

## Rule Details

The 'wait' function from the library 'ember-test-helpers/wait' is outdated.
We should now use "import { settled } from \'@ember/test-helpers\';"

Examples of **incorrect** code for this rule:

```js
import wait from 'ember-test-helpers/wait';
```

Examples of **correct** code for this rule:

```js
import { wait } from 'ember-test-helpers/wait';
```

```js
import wait from 'something/else/entirely';
```
