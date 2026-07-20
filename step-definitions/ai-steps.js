import { Given, When } from '@cucumber/cucumber';
import { getElementIndex } from '../utils/ai-helper.js';

Given('I navigate to the practice site', async function () {
  await this.page.goto('https://practice.expandtesting.com/inputs');
});

When('I ask AI to {string}', async function (action) {

  const index = await getElementIndex(this.page, action);

  const locator = this.page.locator(
    'input, button, select, textarea, a, label, [role="button"]'
  ).nth(index);

  if (action.toLowerCase().startsWith('type')) {

    const match = action.match(/type\s+(.+?)\s+into/i);

    if (!match) {
      throw new Error(`Could not extract value from: ${action}`);
    }

    await locator.fill(match[1]);

  } else {

    await locator.click();

  }
});