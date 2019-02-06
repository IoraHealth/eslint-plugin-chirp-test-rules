"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const looksLike = require("../helpers/looks-like.js");

module.exports = {
  meta: {
    docs: {
      description: "Array or object literal await multiple new promises",
      recommended: true
    },
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    let invalidExpressions;
    let functionStack;
    let activeFunction;
    let insideAsync;

    function enterProgram() {
      invalidExpressions = [];
      functionStack = [];
      activeFunction = null;
      insideAsync = false;
    }

    function getInsideAsync() {
      return !!functionStack.find(func => func.async);
    }

    function enterFunction(node) {
      functionStack.push(node);
      activeFunction = node;
      insideAsync = getInsideAsync();
    }

    function enterMemberExpression(node) {
      if (!insideAsync) {
        return;
      }
      const isMatch = looksLike(node, {
        property: {
          type: "Identifier",
          name: (n) => n === 'then' || n === 'catch'
        }
      });

      if (!isMatch) {
        return;
      }

      context.report(node.property, `async function contains "${node.property.name}" clause`);
    }

    function exitFunction(node) {
      functionStack.pop();
      activeFunction = functionStack[functionStack.length - 1];
      insideAsync = getInsideAsync();
    }

    return {
      Program: enterProgram,
      ArrowFunctionExpression: enterFunction,
      FunctionDeclaration: enterFunction,
      FunctionExpression: enterFunction,
      MemberExpression: enterMemberExpression,
      "ArrowFunctionExpression:exit": exitFunction,
      "FunctionDeclaration:exit": exitFunction,
      "FunctionExpression:exit": exitFunction
    };
  }
};
