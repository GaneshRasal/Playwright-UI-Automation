import { When, Then } from '@cucumber/cucumber';
import assert from 'assert';
import { DialogUtils } from '../utils/dailog-utils.js';

When('I accept the JavaScript alert', async function () {

    const dialogPromise = DialogUtils.handleDialog(this.page);

    await this.page.getByRole('button', {
        name: 'Click for JS Alert'
    }).click();

    this.dialogMessage = await dialogPromise;

});

When('I accept the confirmation dialog', async function () {

    const dialogPromise = DialogUtils.handleDialog(this.page);

    await this.page.getByRole('button', {
        name: 'Click for JS Confirm'
    }).click();

    this.dialogMessage = await dialogPromise;

});

When('I dismiss the confirmation dialog', async function () {

    const dialogPromise = DialogUtils.handleDialog(
        this.page,
        'dismiss'
    );

    await this.page.getByRole('button', {
        name: 'Click for JS Confirm'
    }).click();

    this.dialogMessage = await dialogPromise;

});

When('I enter {string} in the prompt dialog', async function (text) {

    const dialogPromise = DialogUtils.handleDialog(
        this.page,
        'accept',
        text
    );

    await this.page.getByRole('button', {
        name: 'Click for JS Prompt'
    }).click();

    this.dialogMessage = await dialogPromise;

});

Then('I should see the result message {string}', async function (expectedMessage) {

    const actualMessage = await this.page.locator('#result').textContent();

    assert.strictEqual(actualMessage.trim(), expectedMessage);

});