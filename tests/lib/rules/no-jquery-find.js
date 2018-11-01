/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/no-jquery-find"),
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
ruleTester.run("no-jquery-find", rule, {
  valid: [
    "import { find } from 'ember-native-dom-helpers'; const el = find('.selector');",
    "import { find as blah } from 'ember-native-dom-helpers'; const el = blah('.selector');",

    "import { find } from 'ember-native-dom-helpers'; const el = find('.selector').text();",
    "import { find as blah } from 'ember-native-dom-helpers'; const el = blah('.selector').text();",

    "import { find } from 'ember-native-dom-helpers'; expect(find('.selector')).to.be.ok;",
    "import { find as blah } from 'ember-native-dom-helpers'; expect(blah('.selector')).to.be.ok;",

    "import { find } from 'ember-native-dom-helpers'; expect(find('.selector').text()).to.be.ok;",
    "import { find as blah } from 'ember-native-dom-helpers'; expect(blah('.selector').text()).to.be.ok;",
  ],

  invalid: [
    {
      code: "const el = find('.selector');",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "const el = find('.selector').text();",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "import { find as x } from 'ember-native-dom-helpers'; const el = find('.selector');",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "import { find as x } from 'ember-native-dom-helpers'; const el = find('.selector').text();",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },

    {
      code: "expect(find('.selector')).to.be.ok;",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "expect(find('.selector').text()).to.be.ok;",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "import { find as x } from 'ember-native-dom-helpers'; expect(find('.selector')).to.be.ok;",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
    {
      code: "import { find as x } from 'ember-native-dom-helpers'; expect(find('.selector').text()).to.be.ok;",
      errors: [ { message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'" } ]
    },
  ]
});
