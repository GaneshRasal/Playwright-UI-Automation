import {Given} from '@cucumber/cucumber';

Given('user navigates to google search', async function () {
    await this.page.goto('https://www.google.com');
})