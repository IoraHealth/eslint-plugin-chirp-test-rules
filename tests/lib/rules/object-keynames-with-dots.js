/**
 * @fileoverview Check if an object literal has any keynames containing a dot.
 * @author Steve Zelaznik
 */
'use strict';

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require('../../../lib/rules/object-keynames-with-dots'),
  RuleTester = require('eslint').RuleTester;

RuleTester.setDefaultConfig({
  parserOptions: {
    ecmaVersion: 2017,
    sourceType: 'module'
  }
});

var ruleTester = new RuleTester();
ruleTester.run('object-keynames-with-dots', rule, {
  valid: [
    "const data = {x: 3, y: 4, z: 5}"
  ],

  invalid: [
    {
      code: 'const data = {"x.y": 3}',
      errors: [
        {
          message: 'Cannot use a string key name with a "." in it'
        }
      ]
    }
  ]
});
