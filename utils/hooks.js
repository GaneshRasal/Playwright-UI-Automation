import { Before, After, setDefaultTimeout, AfterStep } from '@cucumber/cucumber';
import { chromium } from 'playwright';
import { captureScreenshotOnFailure } from './screenshotHelper.js';
import { logger } from './logger.js';

setDefaultTimeout(60000);
Before(async function () {
  this.browser = await chromium.launch({ headless: false });
  this.context = await this.browser.newContext();
  this.page = await this.context.newPage();
});

AfterStep(async function (stepInfo) {
  // Take screenshot immediately if this specific step fails
  await captureScreenshotOnFailure(stepInfo, this);
});

After(async function (scenario) {
 // Pass the scenario and 'this' (the World). That's it.
 // await captureScreenshotOnFailure(scenario, this);

  //Close the browser context to clean up memory
  await this.page?.close();
  await this.context?.close();
  await this.browser?.close();
});