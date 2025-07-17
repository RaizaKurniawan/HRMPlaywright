import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByText("Forgot your password?", { exact: true }).click()
})

test('TFP-0001 | Forgot Password Valid Username', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Reset Password", exact: true })).toHaveText('Reset Password')
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByRole("button", { name: "Reset Password", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Reset Password link sent successfully", exact: true })).toBeVisible()
});

test('TFP-0002 | Forgot Password Blank Username', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Reset Password", exact: true })).toHaveText('Reset Password')
    await page.getByRole("button", { name: "Reset Password", exact: true }).click()
    await expect(page.getByText("Required", { exact: true })).toBeVisible()
})

test('TFP-0003 | Forgot Password Back to Login Page', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Reset Password", exact: true })).toHaveText('Reset Password')
    await page.getByRole("button", { name: "Cancel", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Login" })).toBeVisible()
})