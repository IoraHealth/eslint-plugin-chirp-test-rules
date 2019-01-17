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

    return {
      Program() {
        invalidExpressions = [];
      },

      "Program:exit": function() {
        let groupedByObject = [];

        invalidExpressions.forEach(node => {
          let objectGroup = groupedByObject.find(
            ({ object }) => node.parent.parent == object
          );

          if (!objectGroup) {
            objectGroup = {
              object: node.parent.parent,
              awaitExpressions: [node]
            };
            groupedByObject.push(objectGroup);
          } else {
            objectGroup.awaitExpressions.push(node);
          }
        });

        groupedByObject.forEach(({ object, awaitExpressions }) => {
          if (awaitExpressions.length > 1) {
            awaitExpressions.forEach(node => {
              if (node.parent.type === "ArrayExpression") {
                context.report(
                  node,
                  "Multiple promises instantiated and awaited inside array literal"
                );
              } else if (node.parent.parent.type === "ObjectExpression") {
                context.report(
                  node,
                  "Multiple promises instantiated and awaited inside object literal"
                );
              }
            });
          }
        });
      },

      AwaitExpression(node) {
        const isMatch = looksLike(node, {
          argument: {
            type: t => t !== "Identifier"
          },
          parent(p) {
            return (
              looksLike(p, {
                type: "Property",
                parent: {
                  type: "ObjectExpression"
                }
              }) ||
              looksLike(p, {
                type: "ArrayExpression"
              })
            );
          }
        });

        if (isMatch) {
          invalidExpressions.push(node);
        }
      }
    };
  }
};
