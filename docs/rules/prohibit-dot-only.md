# Don&#39;t allow it.only and similar tests in mocha (prohibit-dot-only)

Make sure we don't accientally leave any it.only, context.only or describe.only clauses in our test suite.  It also prohibits any sort of aliasing that could be used to try to bypass the lint rule.  In case some unrelated module is renamed as "it, describe, or context" those are ignored.


## Rule Details

Examples of **incorrect** code for this rule:

```js
import { it } from "not-mocha";
it.only("works", function() {});
```

```js
import { context } from "not-mocha";
context.only("works", function() {});
```

```js
import { describe } from "not-mocha";
describe.only("works", function() {});
```

```js
import { hello } from "mocha";
hello.only("works", function() {});
```

```js
import { it } from "mocha";
it.only("works", function() {});
```

```js
import { context } from "mocha";
context.only("works", function() {});
```

```js
import { describe } from "mocha";
describe.only("works", function() {});
```

```js
import { it as itAlias } from "mocha";
```

```js
import { context as contextAlias } from "mocha";
```

```js
import { describe as describeAlias } from "mocha";
```


Examples of **correct** code for this rule:

```js
import { it } from "mocha";
it("works", function() {});
```

```js
import { context } from "mocha";
context("works", function() {});
```

```js
import { describe } from "mocha";
describe("works", function() {});
```

```js
import { notIt } from "mocha";
it.only("works", function() {});
```

```js
import { notContext } from "mocha";
context.only("works", function() {});
```

```js
import { notDescribe } from "mocha";
describe.only("works", function() {});
```
