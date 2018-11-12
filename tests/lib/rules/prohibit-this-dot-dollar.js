/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prohibit-this-dot-dollar"),
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
ruleTester.run("prohibit-this-dot-dollar", rule, {
  valid: [],
  invalid: [
    {
      code: "const el = this.$('hello')",
      errors: [{ message: "this.$() statements are deprecated" }]
    },
    {
      code: "expect(this.$().text()).to.contain('')",
      errors: [{ message: "this.$() statements are deprecated" }]
    },
    {
      code: "expect(this['$'].text()).to.contain('')",
      errors: [{ message: "this.$() statements are deprecated" }]
    }
  ]
});
