import "dotenv/config";
import Groq from "groq-sdk";

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

export const SELECTOR =
    "input, button, select, textarea, a, label, output, span, div, p, [role='button']";

export async function getAIPlan(page, request) {

    const elements = await page.evaluate((selector) => {

        function getLabel(element) {

            if (!element.id) return "";

            const label = document.querySelector(
                `label[for="${element.id}"]`
            );

            return label ? label.innerText.trim() : "";
        }

        return [...document.querySelectorAll(selector)].map((el, index) => ({

            index,

            tag: el.tagName.toLowerCase(),

            type: el.type || "",

            id: el.id || "",

            name: el.name || "",

            label: getLabel(el),

            text: (el.innerText || "").trim(),

            placeholder: el.placeholder || "",

            value: el.value || "",

            role: el.getAttribute("role") || "",

            visible: !!(
                el.offsetWidth ||
                el.offsetHeight ||
                el.getClientRects().length
            ),

            disabled: el.disabled || false

        }));

    }, SELECTOR);

    const prompt = `
You are a Senior Playwright Automation Engineer.

You must identify the correct element from the DOM.

User Request

${JSON.stringify(request, null, 2)}

Available Elements

${JSON.stringify(elements, null, 2)}

Match elements using this priority:

1. label
2. id
3. name
4. placeholder
5. text

Supported Actions

fill
click
clear
hover
dblclick
check
uncheck
select
press

Supported Assertions

assertValue
assertText
assertVisible
assertHidden
assertChecked
assertDisabled

Rules

- Never guess.
- If no confident match exists return success=false.
- Confidence must be between 0 and 1.
- Return ONLY JSON.

Examples

Fill

{
    "success": true,
    "action": "fill",
    "index": 0,
    "value": "42",
    "confidence": 0.99
}

Click

{
    "success": true,
    "action": "click",
    "index": 5,
    "confidence": 0.98
}

Assertion

{
    "success": true,
    "action": "assertValue",
    "index": 8,
    "expected": "42",
    "confidence": 0.99
}

Failure

{
    "success": false,
    "reason": "Unable to identify requested element."
}
`;

    const response = await groq.chat.completions.create({

         model: 'llama-3.3-70b-versatile',
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

    console.log("🤖 AI Response");

    console.log(plan);

    if (!plan.success) {
        throw new Error(plan.reason);
    }

    if (plan.index === undefined) {
        throw new Error("AI didn't return element index.");
    }

    if (plan.index < 0 || plan.index >= elements.length) {
        throw new Error(
            `Invalid element index returned by AI : ${plan.index}`
        );
    }

    if (plan.confidence < 0.80) {
        throw new Error(
            `Low AI confidence : ${plan.confidence}`
        );
    }

    return plan;
}