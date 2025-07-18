import {test, expect} from '@playwright/test';

test.beforeEach(async ({page}) => {
    await page.goto('/');
    await expect(page.getByRole('heading', { name: 'Login', exact: true })).toHaveText('Login')
})

test('TVML-0001 | Verify LinkedIn Link', async ({page}) => {
    await page.locator("svg.oxd-icon.orangehrm-sm-icon")
    await page.locator("svg.oxd-icon.orangehrm-sm-icon")
});