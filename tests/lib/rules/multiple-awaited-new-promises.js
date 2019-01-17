/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/multiple-awaited-new-promises"),
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
ruleTester.run("multiple-awaited-new-promises", rule, {
  valid: [
    "async function model() { return [await a, await b]; }",
    "async function model() { return { a: await a, b: await b }; }",
    "async function model() { return [await a(), await b]; }",
    "async function model() { return { a: await a(), b: await b }; }",
    "async function model() { return [await a, await b()]; }",
    "async function model() { return { a: await a, b: await b() }; }",
  ],

  invalid: [
    {
      code: "async function model() { return { a: await a(), b: await b() }; }",
      errors: [
        { message: "Multiple promises instantiated and awaited inside object literal" },
        { message: "Multiple promises instantiated and awaited inside object literal" }
      ]
    },
    {
      code: "async function model() { return { a: await data.a, b: await data.b }; }",
      errors: [
        { message: "Multiple promises instantiated and awaited inside object literal" },
        { message: "Multiple promises instantiated and awaited inside object literal" }
      ]
    },
    {
      code: "async function model() { return [ await a(), await b() ]; }",
      errors: [
        { message: "Multiple promises instantiated and awaited inside array literal" },
        { message: "Multiple promises instantiated and awaited inside array literal" }
      ]
    },
    {
      code: "async function model() { return [ await data.a, await data.b ]; }",
      errors: [
        { message: "Multiple promises instantiated and awaited inside array literal" },
        { message: "Multiple promises instantiated and awaited inside array literal" }
      ]
    }
  ]
});
