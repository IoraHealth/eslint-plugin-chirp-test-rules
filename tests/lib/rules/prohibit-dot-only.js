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
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run("prohibit-dot-only", rule, {
  valid: [
    // give me some code that won't trigger a warning
  ],

  invalid: [
    {
      code: `
        import { it } from 'mocha';
        it.only('works', function() {});
      `,
      errors: [
        {
          message: "it.only calls are not permitted"
        }
      ]
    }
  ]
});