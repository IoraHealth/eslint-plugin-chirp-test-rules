/**
 * @fileoverview Don&#39;t allow it.only and similar tests in mocha
 * @author Steve Zelaznik
 */
"use strict";

//------------------------------------------------------------------------------
// Requirements
//------------------------------------------------------------------------------

var rule = require("../../../lib/rules/prohibit-dot-only"),

    RuleTester = require("../../../lib/testers/rule-tester");


//------------------------------------------------------------------------------
// Tests
//------------------------------------------------------------------------------

var ruleTester = new RuleTester();
ruleTester.run("prohibit-dot-only", rule, {

    valid: [

        // give me some code that won't trigger a warning
    ],

    invalid: [
        {
            code: "it.only(\"works\", () => expect(subject).to.be.ok)",
            errors: [{
                message: "Fill me in.",
                type: "Me too"
            }]
        }
    ]
});
