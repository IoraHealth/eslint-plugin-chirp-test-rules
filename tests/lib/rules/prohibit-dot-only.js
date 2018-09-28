/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prohibit-dot-only"),
  RuleTester = require("eslint").RuleTester;

//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: "module"
  }
});

var ruleTester = new RuleTester();
ruleTester.run("prohibit-dot-only", rule, {
  valid: [
    "import { it } from 'mocha'; it('works', function() {});",
    "import { context } from 'mocha'; context('works', function() {});",
    "import { describe } from 'mocha'; describe('works', function() {});",

    "import { notIt } from 'mocha'; it.only('works', function() {});",
    "import { notContext } from 'mocha'; context.only('works', function() {});",
    "import { notDescribe } from 'mocha'; describe.only('works', function() {});",

    "import { hello } from 'mocha'; hello.only('works', function() {});"
  ],

  invalid: [
    {
      code: "import { it } from 'mocha'; it.only('works', function() {});",
      errors: [ { message: "it.only calls are not permitted" } ]
    },
    {
      code: "import { context } from 'mocha'; context.only('works', function() {});",
      errors: [ { message: "context.only calls are not permitted" } ]
    },
    {
      code: "import { describe } from 'mocha'; describe.only('works', function() {});",
      errors: [ { message: "describe.only calls are not permitted" } ]
    },
    {
      code: "import { it as itAlias } from 'mocha';",
      errors: [ { message: 'cannot alias the "it" imports from mocha' } ]
    },
    {
      code: "import { context as contextAlias } from 'mocha';",
      errors: [ { message: 'cannot alias the "context" imports from mocha' } ]
    },
    {
      code: "import { describe as describeAlias } from 'mocha';",
      errors: [ { message: 'cannot alias the "describe" imports from mocha' } ]
    }
  ]
});
