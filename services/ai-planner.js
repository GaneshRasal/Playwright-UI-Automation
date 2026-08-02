import "dotenv/config";
import Groq from "groq-sdk";
import { CacheService } from "./cache-service.js";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export class AIPlanner {

    static async createExecutionPlan(page, instructions) {

        const dom = await CacheService.getDOM(page);

        const prompt = `
You are a Senior Playwright Automation Engineer.

Your job is to convert the user's instructions into a Playwright execution plan.

Available Elements

${JSON.stringify(dom, null, 2)}

Instructions

${instructions}

Supported Actions

fill
click
clear
hover
dblclick
check
uncheck
press
select
upload

Supported Assertions

assertValue
assertText
assertVisible
assertHidden
assertChecked
assertDisabled

Element Matching Priority

1. label
2. id
3. name
4. placeholder
5. text

Rules

- Never guess.
- Confidence must be >= 0.80
- Return ONLY valid JSON.
- Use the elementId provided in the DOM.
- Preserve the same execution order as the instructions.

Example

{
    "success": true,
    "steps": [
        {
            "action": "fill",
            "elementId": 0,
            "value": "42",
            "confidence": 0.99
        },
        {
            "action": "click",
            "elementId": 5,
            "confidence": 0.98
        },
        {
            "action": "assertValue",
            "elementId": 8,
            "expected": "42",
            "confidence": 0.99
        }
    ]
}

Failure Example

{
    "success": false,
    "reason": "Unable to identify Number input."
}
`;

        const response = await groq.chat.completions.create({

            model: "llama-3.3-70b-versatile",

            temperature: 0,

            response_format: {
                type: "json_object"
            },

            messages: [
                {
                    role: "user",
                    content: prompt
                }
            ]

        });

        const plan = JSON.parse(
            response.choices[0].message.content
        );

        if (!plan.success) {
            throw new Error(plan.reason);
        }

        if (!plan.steps || !Array.isArray(plan.steps)) {
            throw new Error("AI didn't return execution steps.");
        }

        for (const step of plan.steps) {

            if (step.elementId === undefined) {
                throw new Error(
                    "Missing elementId from AI response."
                );
            }

            if (step.elementId >= dom.length) {
                throw new Error(
                    `Invalid elementId ${step.elementId}`
                );
            }

            if (step.confidence < 0.80) {
                throw new Error(
                    `Low confidence (${step.confidence})`
                );
            }

            step.element = dom.find(
                e => e.elementId === step.elementId
            );

        }

        console.log("\n🤖 AI Execution Plan\n");

        console.table(plan.steps);

        return plan.steps;

    }

}