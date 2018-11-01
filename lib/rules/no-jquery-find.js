/**
 * @fileoverview Don't allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const looksLike = require("../helpers/looks-like.js");

module.exports = {
  meta: {
    docs: {
      description: "Don't allow legacy 'find' functions which use j-query",
      recommended: false
    },
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    const activeRunnerNames = [];

    return {
      ImportSpecifier(node) {
        const isMatch = looksLike(node, {
          parent: {
            source: {
              type: "Literal",
              value: "ember-native-dom-helpers"
            }
          },
          imported: {
            type: "Identifier",
            name: "find"
          }
        });

        if (!isMatch) {
          return;
        }

        activeRunnerNames.push(node.local.name);
      },

      CallExpression(node) {
        const isMatch = looksLike(node, {
          callee: {
            type: "Identifier",
            name(n) {
              return n === "find" && !activeRunnerNames.includes(n);
            }
          }
        });

        if (!isMatch) {
          return;
        }

        context.report({
          node,
          message: "Deprecated 'find' function.  Please use 'ember-native-dom-helpers'"
        });
      }
    };
  }
};
