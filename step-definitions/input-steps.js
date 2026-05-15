import {Given, When, Then} from '@cucumber/cucumber';
import assert from 'assert';

// ─── Input Steps ───────────────────────────────────────────────────────────────

// The page has label text: "Input: Number", "Input: Text", "Input: Password", "Input: Date"
// getByLabel() links the <input> to its associated <label> — most resilient locator here

When('I fill the number input with {string}', async function (value){
  // getByLabel matches the <label> text and targets its linked <input>
    await this.page.getByLabel('Input: Number').fill(value);
});

When('I click the {string} button', async function(btnText){
// getByRole('button') is the recommended locator for buttons
  await this.page.getByRole('button',{ name: btnText}).click();
});

Then('the number output should have value {string}',async function (expected) {
  const locator = this.page.locator('#output-number');
 // await locator.waitFor();
  const actual = await locator.textContent();
  assert.strictEqual(actual, expected);
})

When('I fill the text input with {string}', async function (text){
    await this.page.getByLabel('Input: Text').fill(text);
});

Then('the text output should have value {string}', async function (expected) {
  const locator = this.page.locator('#output-text');
  const actual = await locator.textContent();
  assert.strictEqual(actual, expected);
});

When('I fill the date input with {string}',async function(date) {
  await this.page.getByLabel('Input: Date').fill(date);
});

Then('the date output should have value {string}', async function(expectedDate) {
  const locator = this.page.locator('#output-date');
  const actualDate = await locator.textContent();
  assert.strictEqual(actualDate,expectedDate);
});

When('I clear the text input manually', async function (){
    await this.page.getByLabel('Input: Text').clear();
    await this.page.getByLabel('Input: Number').clear();
});

Then('the text output should not be visible', async function () {
  const isVisible = await this.page.locator('#output-text').isVisible();
  assert.strictEqual(isVisible, false);
});

Then('the number output should not be visible', async function () {
  const isVisible = await this.page.locator('#output-number').isVisible();
  assert.strictEqual(isVisible, false);
});