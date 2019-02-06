/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/async-contains-then-or-catch"),
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
ruleTester.run("async-contains-then-or-catch", rule, {
  valid: [
    "function f() { return hello().then(v => world); }",
    "function f() { return hello().catch(v => world); }",
    "var f = () => { return hello().then(v => world); }",
    "var f = () => { return hello().catch(v => world); }",
    "async function f() { var v = await hello(); return 4 * v; }",
    "async function f() { try { await Promise.reject(3); } catch(e) { return e * 4; } }",
    "var f = async () => { var v = await hello(); return 4 * v; }",
    "var f = async () => { try { await Promise.reject(3); } catch(e) { return e * 4; } }",
  ],

  invalid: [
    {
      code: "async function f() { await Promise.resolve(3).then(v => 4 * v); }",
      errors: ['async function contains "then" clause']
    },
    {
      code: "async function f() { await Promise.reject(3).catch(v => 4 * v); }",
      errors: ['async function contains "catch" clause']
    },
    {
      code: "var f = async function() { await Promise.resolve(3).then(v => 4 * v); }",
      errors: ['async function contains "then" clause']
    },
    {
      code: "var f = async function() { await Promise.reject(3).catch(v => 4 * v); }",
      errors: ['async function contains "catch" clause']
    },
    {
      code: "var f = async () => { await Promise.resolve(3).then(v => 4 * v); }",
      errors: ['async function contains "then" clause']
    },
    {
      code: "var f = async () => { await Promise.reject(3).catch(v => 4 * v); }",
      errors: ['async function contains "catch" clause']
    }
  ]
});
