// helpers.js

// Function Login
export async function login(page, username, password) {
    await page.goto('/');
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin123')
    await page.getByRole("button", { name: "Login", exact: true }).click()

}