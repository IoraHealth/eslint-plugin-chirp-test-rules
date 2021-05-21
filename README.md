# eslint-plugin-chirp-test-rules

Enforces best practices for ember mocha tests

## Installation

You'll first need to install [ESLint](http://eslint.org):

```
$ npm i eslint --save-dev
```

Next, install `eslint-plugin-chirp-test-rules`:

```
$ npm install eslint-plugin-chirp-test-rules --save-dev
```

**Note:** If you installed ESLint globally (using the `-g` flag) then you must also install `eslint-plugin-chirp-test-rules` globally.

## Usage

Add `chirp-test-rules` to the plugins section of your `.eslintrc` configuration file. You can omit the `eslint-plugin-` prefix:

```json
{
  "plugins": ["chirp-test-rules"]
}
```

Then configure the rules you want to use under the rules section.

```json
{
  "rules": {
    "chirp-test-rules/rule-name": 2
  }
}
```

## Supported Rules

- Fill in provided rules here

## Automated Testing

[![CircleCI](https://circleci.com/github/IoraHealth/eslint-plugin-chirp-test-rules.svg?style=svg)](https://app.circleci.com/pipelines/github/IoraHealth/eslint-plugin-chirp-test-rules)
