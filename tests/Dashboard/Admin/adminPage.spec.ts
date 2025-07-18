import {test, expect} from '@playwright/test';
import { login } from '../../helper/helpers';

test.beforeEach(async ({page}) => {
    await login(page)
})

test('TCA-0001 - Verify the Admin Page/User Management', async ({page}) => {
    await expect(page.getByText("Admin", { exact: true })).toHaveText("Admin");
    await page.getByText('Admin', { exact: true }).click();
    await expect(page.getByRole("heading", { name: "User Management"})).toHaveText("User Management");
    await expect(page.getByRole("heading", { name: "Admin" })).toHaveText("Admin");
});

test('TC-0002 - Add New User', async ({page}) => {
    await expect(page.getByText("Admin", { exact: true })).toHaveText("Admin");
    await page.getByText('Admin', { exact: true }).click();
    await page.waitForSelector('button');
    await page.getByRole("button", { name: "Add"}).click()

    await expect(page.getByRole("heading", { name: "Add User" })).toHaveText("Add User");
    await expect(page.getByText("User Role", { exact: true })).toHaveText("User Role");
    await page.getByText('-- Select --').first().selectText()
    await page.getByRole('option', { name: 'Admin' }).locator('span').click();
    await expect(page.getByText("Status", { exact: true })).toHaveText("Status");
    await page.getByText("-- Select --", { exact: true }).selectText()
    await page.getByText("Enabled", { exact: true }).click()
    //await page.getByText("-- Select --", { exact: true }).locator("i.oxd-icon.bi-caret-up-fill.oxd-select-text--arrow").selectText()
    //await page.getByText('-- Select --').nth(1).selectText()
   // await page.getByText("-- Select --", { exact: true }).locator("i.oxd-icon.bi-caret-up-fill.oxd-select-text--arrow").selectText()


})