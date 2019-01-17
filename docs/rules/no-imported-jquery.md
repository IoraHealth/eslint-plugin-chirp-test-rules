# Disallows the use of the jquery library (no-imported-jquery)

## Rule Details

Examples of **incorrect** code for this rule:

```js
import $ from "jquery";
```

```js
import $ from "jquery";
$({ x: 3 });
```

```js
import $ from "jquery";
$.world({ x: 3 });
```

```js
import hello from "jquery";
hello({ x: 3 });
```

```js
import { params } from "jquery";
params({ x: 3 });
```


Examples of **correct** code for this rule:

```js
import $ from "something-else";
$("");
$.params("");
```

### Options

If there are any options, describe them here. Otherwise, delete this section.

## When Not To Use It

Give a short description of when it would be appropriate to turn off this rule.

## Further Reading

If there are other links that describe the issue this rule addresses, please include them here in a bulleted list.
