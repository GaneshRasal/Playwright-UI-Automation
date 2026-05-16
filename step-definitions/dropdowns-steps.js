import {When,Then} from '@cucumber/cucumber';
import { expect } from '@playwright/test';

// ==========================================
// STATIC DROPDOWNS (<select>)
// ==========================================

When('I select the option with value {string} from the static dropdown', async function(value) {
    const staticDropdown = this.page.locator('#dropdown-class-example');
    await staticDropdown.selectOption({value:value});
});

When('I select the option with label {string} from the static dropdown', async function(label){
   const staticDropdown = this.page.locator('#dropdown-class-example');
    await staticDropdown.selectOption({label:label});
});

Then('the static dropdown should display the text {string}', async function(expectedText) {
    const staticDropdown = this.page.locator('#dropdown-class-example');
// Validates the text of the currently selected <option>
    await expect(staticDropdown.locator('option:checked')).toHaveText(expectedText);
});

// ==========================================
// DYNAMIC DROPDOWNS (Auto-Suggest)
// ==========================================

When('I type {string} into the dynamic country dropdown', async function(inputText){
   const autoSuggestInput = this.page.locator('#autocomplete');
   // Mimics human typing to trigger the API backend
   await autoSuggestInput.pressSequentially(inputText, {delay:100});
});

When('I clear the dynamic country dropdown manually', async function(){
   const autoSuggestInput = this.page.locator('#autocomplete');
   // Playwright's native clear method for input fields
   await autoSuggestInput.clear();
});

When('I wait for the auto-suggest list to populate', async function(){
    const suggestionList = this.page.locator('.ui-menu-item');
// Waits for the dynamic UI elements to render
    await suggestionList.first().waitFor({ state : 'visible'});
});

When('I select {string} from the dynamic suggestion list', async function(targetOption){
   const options = this.page.locator('.ui-menu-item div');
   const count = await options.count();

   for(var i=0;i<count;i++){
    const text =await options.nth(i).textContent();
    if(text.trim() === targetOption){
        await options.nth(i).click();
        break;
    }
   }
});

Then('the dynamic dropdown input should contain the value {string}', async function(expectedValue){
   const autoSuggestInput = this.page.locator('#autocomplete');
   await expect(autoSuggestInput).toHaveValue(expectedValue);
});

// ==========================================
// KEYBOARD NAVIGATION
// ==========================================

When('I press the {string} key {int} times', async function(keyName, times){
  for(let i=0;i<=times;i++){
    await this.page.keyboard.press(keyName);
    await this.page.waitForTimeout(100); // UI render buffer
  }
});

When('I press the {string} key', async function(keyName){
    await this.page.keyboard.press(keyName);
});

Then('the dynamic dropdown input should not be empty', async function(){
   const autoSuggestInput = this.page.locator('#autocomplete');
   await expect(autoSuggestInput).not.toBeEmpty();
});