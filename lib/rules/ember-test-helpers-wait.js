'use strict';

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

const looksLike = require('../helpers/looks-like.js');

module.exports = {
  meta: {
    docs: {
      description: 'catches deprecated "wait" functions imported from "ember-test-helpers/wait"',
      recommended: true
    },
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    return {
      ImportDeclaration(node) {
        const isMatch = looksLike(node, {
          source: {
            type: 'Literal',
            value: 'ember-test-helpers/wait'
          },
          specifiers(args) {
            return !!args.find((specifier) =>
              looksLike(specifier, {
                type: 'ImportDefaultSpecifier'
              })
            );
          }
        });

        if (!isMatch) {
          return;
        }

        context.report(
          node,
          'The wait function is deprecated.  Please use "import { settled } from \'@ember/test-helpers\';"'
        );
      }
    };
  }
};
