// services/assertion.js

import { expect } from "@playwright/test";

export class Assertion {

    static async execute(page, plan) {

        for (const step of plan) {

            if (!step.action.startsWith("assert")) {
                continue;
            }

            console.log(`✅ Assertion : ${step.action}`);

            const locator = page.locator(step.element.xpath);

            switch (step.action) {

                case "assertValue":

                    await expect(locator)
                        .toHaveValue(step.expected);

                    break;

                case "assertText":

                    await expect(locator)
                        .toHaveText(step.expected);

                    break;

                case "assertContainsText":

                    await expect(locator)
                        .toContainText(step.expected);

                    break;

                case "assertVisible":

                    await expect(locator)
                        .toBeVisible();

                    break;

                case "assertHidden":

                    await expect(locator)
                        .toBeHidden();

                    break;

                case "assertChecked":

                    await expect(locator)
                        .toBeChecked();

                    break;

                case "assertDisabled":

                    await expect(locator)
                        .toBeDisabled();

                    break;

                case "assertEnabled":

                    await expect(locator)
                        .toBeEnabled();

                    break;

                case "assertEmpty":

                    await expect(locator)
                        .toHaveValue("");

                    break;

                case "assertAttribute":

                    await expect(locator)
                        .toHaveAttribute(
                            step.attribute,
                            step.expected
                        );

                    break;

                default:

                    throw new Error(
                        `Unsupported Assertion : ${step.action}`
                    );

            }

        }

    }

}