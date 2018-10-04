/**
 * @fileoverview Disallows the use of the jquery library
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
      description: "Disallows the use of the jquery library",
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    const jqueryNames = [];

    function report(node) {
      context.report({
        node,
        message: "jquery is deprecated in Ember"
      });
    }

    return {
      ImportDeclaration(node) {
        const isMatch = looksLike(node, {
          source: {
            type: "Literal",
            value: "jquery"
          }
        });

        if (!isMatch) {
          return;
        }

        context.report({
          node,
          message: "jquery importing is not allowed"
        });

        node.specifiers.forEach(function(specifier) {
          jqueryNames.push(specifier.local.name);
        });
      },

      MemberExpression(node) {
        const isMatch = looksLike(node, {
          object: {
            type: "Identifier",
            name: n => jqueryNames.includes(n)
          }
        });

        if (!isMatch) {
          return;
        }

        report(node);
      },

      CallExpression(node) {
        const isMatch = looksLike(node, {
          callee: {
            type: "Identifier",
            name: n => jqueryNames.includes(n)
          }
        });

        if (!isMatch) {
          return;
        }

        report(node);
      }
    };
  }
};
