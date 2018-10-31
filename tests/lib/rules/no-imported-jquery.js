/**
 * @fileoverview Disallows the use of the jquery library
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-imported-jquery"),
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
ruleTester.run("no-imported-jquery", rule, {
  valid: ["import $ from 'something-else'; $(''); $.params('');"],

  invalid: [
    {
      code: "import $ from 'jquery'",
      errors: [{ message: "jquery importing is not allowed" }]
    },
    {
      code: "import $ from 'jquery'; $({x: 3})",
      errors: [
        { message: "jquery importing is not allowed" },
        { message: "jquery is deprecated in Ember" }
      ]
    },
    {
      code: "import $ from 'jquery'; $.world({x: 3})",
      errors: [
        { message: "jquery importing is not allowed" },
        { message: "jquery is deprecated in Ember" }
      ]
    },
    {
      code: "import hello from 'jquery'; hello({x: 3})",
      errors: [
        { message: "jquery importing is not allowed" },
        { message: "jquery is deprecated in Ember" }
      ]
    },
    {
      code: "import { params } from 'jquery'; params({x: 3})",
      errors: [
        { message: "jquery importing is not allowed" },
        { message: "jquery is deprecated in Ember" }
      ]
    }
  ]
});
