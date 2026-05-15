import {When,Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';
// ==========================================
// RADIO BUTTON ACTIONS & ASSERTIONS
// ==========================================


When('I select the {string} radio button', async function(radioValue){
  await this.page.locator(`input[value="${radioValue}"]`).check();
});

Then('the {string} radio button should be checked', async function(radioValue) {
  await expect(this.page.locator(`input[value="${radioValue}"]`)).toBeChecked();
});

Then('the {string} radio button should not be checked', async function(radioValue) {
  // Negative assertion to validate state overrides
  await expect(this.page.locator(`input[value="${radioValue}"]`)).not.toBeChecked();
});

// ==========================================
// CHECKBOX ACTIONS & ASSERTIONS
// ==========================================

When('I check the {string} checkbox', async function(optionText){
  await this.page.locator(`input[value='${optionText}']`).check();
});

When('I uncheck the {string} checkbox', async function(optionText){
  await this.page.locator(`input[value='${optionText}']`).uncheck();
});

Then('the {string} checkbox should be checked', async function(optionText){
  await expect(this.page.locator(`input[value='${optionText}']`)).toBeChecked();
});

Then('the {string} checkbox should be unchecked', async function(optionText){
  await expect(this.page.locator(`input[value='${optionText}']`)).not.toBeChecked();
});

// ==========================================
// BULK ACTIONS
// ==========================================

When('I check all the checkboxes on the page', async function(){
const checkboxes = await this.page.locator(`input[type='checkbox']`);
const count = await checkboxes.count();

for(var i=0; i <= count-1; i++){
  await checkboxes.nth(i).check();
}

});

Then('all checkboxes should be in a checked state', async function(){
const checkboxes = await this.page.locator(`input[type='checkbox']`);
const count = await checkboxes.count();

for(var i=0; i <= count-1; i++){
  await expect(checkboxes.nth(i)).toBeChecked();
}

});