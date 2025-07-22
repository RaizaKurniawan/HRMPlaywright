// helpers.js

// Function Login
import {expect} from "@playwright/test";

export async function login(page) {
    await page.goto('/');
    await page.getByPlaceholder("Username", { exact: true }).fill('Admin')
    await page.getByPlaceholder("Password", { exact: true }).fill('admin123')
    await page.getByRole("button", { name: "Login", exact: true }).click()
}

export async function loginButton(page) {

}

export async function logout() {

}

export async function getUser() {

}

export async function clickSave(page) {
    const saveButton = page.getByRole("button", { name: "Save", exact: true })
    await saveButton.waitFor({state: 'visible', timeout: 10000})
    await saveButton.click()
}

export async function clickSearch(page) {
    const searchButton = page.getByRole("button", { name: "Search", exact: true })
    await searchButton.waitFor({state: 'visible', timeout: 10000})
    await searchButton.click()
}

export async function clickCancel(page) {
    const cancelButton = page.getByRole("button", { name: "Cancel", exact: true })
    await cancelButton.waitFor({state: 'visible', timeout: 10000})
    await cancelButton.click()
}

export async function personalIdManagement(page) {
    await page.getByRole("link", { name: "PIM", exact: true }).click()
    await expect(page.getByText("Add", { exact: true })).toHaveText("Add");
    await page.waitForTimeout(500);
}

export async function clickAdd(page) {
    const addButton = page.getByText('Add', { exact: true })
    await addButton.waitFor({state: 'visible', timeout: 5000})
    await addButton.click()
}

export async function fillTheForm(page) {
    // Fill the form
    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("First Name", { exact: true }).fill('Rose')
    await page.waitForTimeout(500);
    await page.getByPlaceholder("Middle Name", { exact: true }).fill('Maria')
    await page.getByPlaceholder("Last Name", { exact: true }).fill('Sousa')
    await page.waitForTimeout(500);
    await expect(page.getByText("Employee Id", { exact: true })).toHaveText('Employee Id')
}

export async function createLoginDetail(page) {
    // Klik toggle Create Login Details
    const toggle = page.locator('span.oxd-switch-input.oxd-switch-input--active.--label-right');
    await toggle.waitFor({ state: 'visible', timeout: 30000 });
    await toggle.click();

    // Verifikasi teks "Username" muncul
    const usernameLabel = page.getByText('Username', { exact: true });
    await usernameLabel.waitFor({ state: 'visible', timeout: 30000 });
    await expect(usernameLabel).toHaveText('Username');

    // Kembalikan locator untuk field username, password, dan confirm password
    return {
        username: page.locator('div:nth-child(4) > .oxd-grid-2 > div > .oxd-input-group > div:nth-child(2) > .oxd-input'),
        password: page.locator('input[type="password"]').first(),
        confirmPassword: page.locator('input[type="password"]').nth(1),
    };

}

export async function errorRequired(page) {
    await expect(page.getByText("Required", { exact: true })).toHaveText('Required')
}

export async function passwordNotMatch(page) {
    await page.getByText("Passwords do not match", { exact: true })
}