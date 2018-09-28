/**
 * @fileoverview Don't allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Rule Definition
//------------------------------------------------------------------------------

module.exports = {
  meta: {
    docs: {
      description: "Don't allow it.only and similar tests in mocha",
      recommended: false
    },
    fixable: null,  // or "code" or "whitespace"
    schema: [
      // fill in your schema
    ]
  },

  create(context) {
    const validRunnerNames = ['it', 'describe', 'context'];
    const activeRunnerNames = [];

    return {
      ImportSpecifier(node) {
        const importItContextOrDescribe = looksLike(node, {
          parent: {
            source: {
              type: 'Literal',
              value: 'mocha'
            }
          },
          imported: {
            type: 'Identifier',
            name: n => validRunnerNames.includes(n)
          }
        });

        if (!importItContextOrDescribe) { return; }
        
        const hasAlias = looksLike(node, {
          local: {
            type: 'Identifier',
            name: (n) => n !== node.imported.name
          }
        });
        
        if (hasAlias) {
          context.report({
            node,
            message: `cannot alias the "${node.imported.name}" imports from mocha`
          });
        } else {
          activeRunnerNames.push(node.imported.name);
        }
      },
      
      MemberExpression(node) {
        const isMatch = looksLike(node, {
          object: {
            type: 'Identifier',
            name: (n) => activeRunnerNames.includes(n)
          },
          property: {
            type: 'Identifier',
            name: 'only'
          }
        });
        
        if (!isMatch) { return; }

        context.report({
          node,
          message: `${node.object.name}.only calls are not permitted`
        });
      }
    };
  }
};

function looksLike(a, b) {
  return (
    a &&
    b &&
    Object.keys(b).every(bKey => {
      const bVal = b[bKey]
      const aVal = a[bKey]
      if (typeof bVal === 'function') {
        return bVal(aVal)
      }
      return isPrimitive(bVal) ? bVal === aVal : looksLike(aVal, bVal)
    })
  )
}

function isPrimitive(val) {
  return val == null || /^[sbn]/.test(typeof val)
}
