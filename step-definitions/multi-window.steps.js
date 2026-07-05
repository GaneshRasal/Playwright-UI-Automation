import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

When('I open the {string} page', async function (buttonName) {
    const [newPage] = await Promise.all(
        [
            this.context.waitForEvent('page'),
            this.page.getByRole('button', {name:buttonName}).click()
        ]
    )

    await newPage.waitForLoadState();
    this.newPage = newPage;
});

Then('the newly opened page URL should contain', async function () {
  const title =await this.newPage.url();
  assert.strictEqual(title,'http://www.qaclickacademy.com/');

});

Given('I navigate to {string}', async function (url){
  await this.page.goto(url);
  this.parentPage = this.page;
});

When('I open a new browser tab', async function() {
    const newPagePromise = this.context.waitForEvent('page');

    await this.parentPage.getByRole('link',{name: 'Click Here'}).click();

    this.childPage = await newPagePromise;
    await this.childPage.waitForLoadState();
});

Then('the newly opened page should display the heading {string}', async function(expectedHeading){
   const heading = await this.childPage.getByRole('heading').textContent();

   assert.strictEqual(heading.trim(),expectedHeading);
});

When('I close the newly opened page',async function() {
    await this.childPage.close();
});

Then('I should be back on the parent page', async function(){
 const heading = await this.parentPage.getByRole('heading').textContent();

assert.strictEqual(heading.trim(),'Opening a new window');
});