// services/executor.js

import { expect } from "@playwright/test";

export class Executor {

    static async execute(page, plan) {

        for (const step of plan) {

            console.log(`▶ Executing : ${step.action}`);

            const locator = page.locator(step.element.xpath);

            switch (step.action.toLowerCase()) {

                case "fill":

                    await locator.fill(step.value);
                    break;

                case "click":

                    await locator.click();
                    break;

                case "clear":

                    await locator.clear();
                    break;

                case "hover":

                    await locator.hover();
                    break;

                case "dblclick":

                    await locator.dblclick();
                    break;

                case "check":

                    await locator.check();
                    break;

                case "uncheck":

                    await locator.uncheck();
                    break;

                case "select":

                    await locator.selectOption(step.value);
                    break;

                case "press":

                    await locator.press(step.key);
                    break;

                case "upload":

                    await locator.setInputFiles(step.file);
                    break;

                case "wait":

                    await page.waitForTimeout(step.value);
                    break;

                default:

                    throw new Error(
                        `Unsupported action : ${step.action}`
                    );

            }

        }

    }

}