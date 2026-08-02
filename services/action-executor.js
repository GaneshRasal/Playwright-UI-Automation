export async function executeAction(locator, plan) {

    switch (plan.action) {

        case "fill":
            await locator.fill(plan.value);
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
            await locator.selectOption(plan.value);
            break;

        case "press":
            await locator.press(plan.key);
            break;

        default:
            throw new Error(`Unsupported action '${plan.action}'`);
    }
}