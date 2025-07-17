import {test, expect} from '@playwright/test';

test.beforeEach(async ({ page }) => {
    await page.goto('/');
})

test('LTC_0001 | Successfully Login Valid Username & Password', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin123')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Dashboard", exact: true })).toHaveText("Dashboard");
    await expect(page.getByRole('link', { name: 'Dashboard' })).toHaveText('Dashboard');
    await expect(page.getByText("Time at Work", { exact: true })).toBeVisible()
    await expect(page.getByText("My Actions", { exact: true })).toBeVisible()
    await expect(page.getByText('Quick Launch', { exact: true })).toBeVisible()
    await expect(page.getByText("Buzz Latest Posts", { exact: true })).toBeVisible()
    await expect(page.getByText("Employees on Leave Today", { exact: true })).toBeVisible()
    await expect(page.getByText("Employee Distribution by Sub Unit", { exact: true })).toBeVisible()
});

test('LTC_0002 | Login Failed Invalid Username & Password', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Admins')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin1234')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText("Invalid credentials", { exact: true })).toBeVisible()
})

test('LTC_0003 | Login Failed Invalid Password', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin1231')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText("Invalid credentials", { exact: true })).toBeVisible()
})

test('LTC_0004 | Login Failed Invalid Username', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Adminss')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin123')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText("Invalid credentials", { exact: true })).toBeVisible()
})

test('LTC_0005 | Required - All Field Cannot be Blank', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('')
    await page.getByPlaceholder("Password", { exact: true }).fill('')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText('Required').first()).toBeVisible()
    await expect(page.getByText('Required').nth(1)).toBeVisible()
})

test('LTC_0006 | Required - Username Cannot be blank', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('')
    await page.getByPlaceholder("Password", { exact: true }).fill('password123')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText("Required", { exact: true })).toBeVisible()
})

test('LTC_0007 | Required - Password Cannot be blank', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Login", exact: true })).toBeVisible()
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('')
    await page.getByRole("button", { name: "Login", exact: true }).click()
    await expect(page.getByText("Required", { exact: true })).toBeVisible()
})