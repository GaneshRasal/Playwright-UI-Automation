import { expect } from '@playwright/test';

export async function executeAssertion(locator, plan) {

    switch (plan.action) {

        case "assertValue":
            await expect(locator).toHaveValue(plan.expected);
            break;

        case "assertText":
            await expect(locator).toContainText(plan.expected);
            break;

        case "assertVisible":
            await expect(locator).toBeVisible();
            break;

        case "assertHidden":
            await expect(locator).toBeHidden();
            break;

        case "assertChecked":
            await expect(locator).toBeChecked();
            break;

        case "assertDisabled":
            await expect(locator).toBeDisabled();
            break;

        default:
            throw new Error(`Unsupported assertion '${plan.action}'`);
    }

}