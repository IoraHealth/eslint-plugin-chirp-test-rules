"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const looksLike = require("../helpers/looks-like.js");

module.exports = {
  meta: {
    docs: {
      description: "Don't allow legacy 'click' functions which use j-query",
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
            name: "click"
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
              return n === "click" && !activeRunnerNames.includes(n);
            }
          }
        });

        if (!isMatch) {
          return;
        }

        context.report({
          node,
          message: "Deprecated 'click' function.  Please use 'ember-native-dom-helpers'"
        });
      }
    };
  }
};
