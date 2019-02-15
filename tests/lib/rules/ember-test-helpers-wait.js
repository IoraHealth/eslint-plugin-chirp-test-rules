"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/ember-test-helpers-wait"),
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
ruleTester.run("ember-test-helpers-wait", rule, {
  valid: [
    "import { wait } from 'ember-test-helpers/wait'",
    "import wait from 'something/else/entirely'"
  ],

  invalid: [
    {
      code: "import wait from 'ember-test-helpers/wait'",
      errors: ['The wait function is deprecated.  Please use "import { settled } from \'@ember/test-helpers\';"']
    }
  ]
});
