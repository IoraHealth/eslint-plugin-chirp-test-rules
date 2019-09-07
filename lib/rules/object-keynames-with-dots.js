/**
 * @fileoverview Check if an object literal has any keynames containing a dot.
 * @author Steve Zelaznik
 */
'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const looksLike = require("../helpers/looks-like.js");

module.exports = {
  meta: {
    docs: {
      description:
        'Check if an object literal has any keynames containing a dot.',
      recommended: false
    },
    fixable: null, // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create: function(context) {
    return {
      Property(node) {
        const isMatch = looksLike(node, {
          key: {
            type: 'Literal',
            value(v) {
              return (typeof v === 'string') && v.indexOf('.') > -1
            }
          }
        });

        if (!isMatch) {
          return;
        }

        context.report(node, 'Cannot use a string key name with a "." in it');
      }
    };
  }
};
