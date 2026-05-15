import {Given} from '@cucumber/cucumber';

// ─── Background ───────────────────────────────────────────────────────────────

Given('I open the browser and go to {string}', async function (url) {
  await this.page.goto(url);
});