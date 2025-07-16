import {test, expect} from '@playwright/test';

test('loginTest', async ({page}) => {
    await page.goto('/');
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin123')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Dashboard", exact: true })).toHaveText("Dashboard");
    await expect(page.getByText("dashboard", { exact: true })).toBeVisible()
    await expect(page.getByText("Time at Work", { exact: true })).toBeVisible()
    await expect(page.getByText("My Actions", { exact: true })).toBeVisible()
    await expect(page.getByText('Quick Launch', { exact: true })).toBeVisible()
    await expect(page.getByText("Buzz Latest Posts", { exact: true })).toBeVisible()
    await expect(page.getByText("Employees on Leave Today", { exact: true })).toBeVisible()
    await expect(page.getByText("Employee Distribution by Sub Unit", { exact: true })).toBeVisible()
});