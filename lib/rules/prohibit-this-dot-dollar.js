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
      description: "Don't allow this.$() to be used",
      recommended: true
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    const validRunnerNames = ["it", "describe", "context"];
    const activeRunnerNames = [];

    return {
      ThisExpression(node) {
        const isThisDollar = looksLike(node, {
          parent: {
            type: "MemberExpression",
            property(p) {
              return (
                looksLike(p, {
                  type: "Identifier",
                  name: "$"
                }) ||
                looksLike(p, {
                  type: "Literal",
                  value: "$"
                })
              );
            }
          }
        });

        if (isThisDollar) {
          context.report(
            node.parent.property,
            "this.$() statements are deprecated"
          );
        }
      }
    };
  }
};
