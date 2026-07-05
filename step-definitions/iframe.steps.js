import { Given, When, Then } from '@cucumber/cucumber';
import assert from 'assert';

When('I switch to the Courses iframe', async function () {
   this.frame = this.page.frameLocator('#courses-iframe');
 
});

Then('I should see the {string} link', async function (linkName) {
    const link = this.frame.getByRole('link',{name:linkName});

    await link.waitFor();
    assert.ok(await link.isVisible());
});