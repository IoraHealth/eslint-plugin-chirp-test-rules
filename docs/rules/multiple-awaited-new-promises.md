# Objects or arrays that create and await multiple promises

When doing async programming in javascript, sometimes we export objects that call multiple promises in series when they could be run more efficiently in parallel.

## Rule Details

Examples of **incorrect** code for this rule:

```js

// Each new promise is evaluated in serial
async function createAnObject() {
  return { a: await a(), b: await b() };
}

// Same thing with arrays
async function createAnArray() {
  return [ await a(), await b() ];
}

```

Examples of **correct** code for this rule:

```js

// When the promises are declared outside the function, they are all initiated in parallel
async function createAnObject() {
  var a = get_a(), b = get_b();
  return { a: await a, b: await b };
}

async function createAnArray() {
  var a = get_a(), b = get_b();
  return [ await a, await b ];
}

// We'll even be all right if exacty one new promise is created inside the object or array
async function createAnObject() {
  var a = get_a();
  return { a: await a, b: await get_b() };
}

async function createAnArray() {
  var a = get_a();
  return [ await a, await get_b() ];
}

```
