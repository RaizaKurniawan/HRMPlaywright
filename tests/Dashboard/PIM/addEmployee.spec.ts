import {test, expect} from '@playwright/test';
import { login } from '../../helper/helpers';

test.beforeEach(async ({page}) => {
    await login(page)
})

test('TCEM-0001', async ({page}) => {
    await page.getByRole("link", { name: "PIM", exact: true }).click()
    await page.getByRole("button", { name: "Add", exact: true })
    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("First Name", { exact: true })
    await expect(page.getByText("Employee Id", { exact: true })).toHaveText('Employee Id')

});