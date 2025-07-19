import {test, expect} from '@playwright/test';
import { login } from '../../helper/helpers';

test.beforeEach(async ({page}) => {
    await login(page)
})

test('TCEM-0001', async ({page}) => {
    await page.getByRole("link", { name: "PIM", exact: true }).click()
    await expect(page.getByText("Add", { exact: true })).toHaveText("Add");
    await page.waitForTimeout(500);
    await page.getByText("Add", { exact: true }).click()
    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("First Name", { exact: true }).fill('Rose')
    await page.waitForTimeout(500);
    await page.getByPlaceholder("Middle Name", { exact: true }).fill('Maria')
    await page.getByPlaceholder("Last Name", { exact: true }).fill('Sousa')
    await page.waitForTimeout(500);
    await expect(page.getByText("Employee Id", { exact: true })).toHaveText('Employee Id')
    await page.locator("span.oxd-switch-input.oxd-switch-input--active.--label-right").click()
    await page.waitForTimeout(200);
    await expect(page.getByText("Username", { exact: true })).toHaveText('Username')
    await page.waitForTimeout(300);

    await page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input').fill('rosemariasousa')
    await page.locator('input[type="password"]').first().fill('RoseMariasousa*7')
    await page.locator('input[type="password"]').nth(1).fill('RoseMariasousa*7')

    // upload image
    await page.locator("i.oxd-icon.bi-plus").click()
});