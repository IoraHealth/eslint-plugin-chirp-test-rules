/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-jquery-click"),
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
ruleTester.run("no-jquery-click", rule, {
  valid: [
    "import { click } from 'ember-native-dom-helpers'; const el = click('.selector');",
    "import { click as blah } from 'ember-native-dom-helpers'; const el = blah('.selector');",
  ],

  invalid: [
    {
      code: "const el = click('.selector');",
      errors: [ { message: "Deprecated 'click' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "import { click as x } from 'ember-native-dom-helpers'; const el = click('.selector');",
      errors: [ { message: "Deprecated 'click' function.  Please use 'ember-native-dom-helpers'" } ]
    },
  ]
});
