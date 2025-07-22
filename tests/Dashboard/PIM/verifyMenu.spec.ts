import {test, expect} from '@playwright/test';
import { login, personalIdManagement } from '../../helper/helpers'

test.beforeEach(async ({ page }) => {
    await login(page);
    await personalIdManagement(page);

})
test('TCME-0001 | Verify Configuration Menu', async ({page}) => {
    await page.getByText("Configuration", { exact: true }).click()
    await expect(page.getByRole("menuitem", { name: "Optional Fields", exact: true })).toHaveText("Optional Fields");
    await expect(page.getByRole("menuitem", { name: "Custom Fields", exact: true })).toHaveText("Custom Fields");
    await expect(page.getByRole("menuitem", { name: "Data Import", exact: true })).toHaveText("Data Import");
    await expect(page.getByRole("menuitem", { name: "Reporting Methods", exact: true })).toHaveText("Reporting Methods");
    await expect(page.getByRole("menuitem", { name: "Termination Reasons", exact: true })).toHaveText("Termination Reasons");
});

test('TCME-0002 | Verify Employee List Menu', async ({page}) => {
    await expect(page.getByRole("link", { name: "Employee List", exact: true })).toHaveText("Employee List");
});

test('TCME-0003 | Verify Add Employee Menu', async ({page}) => {
    await page.getByRole("link", { name: "Add Employee", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Add Employee", exact: true })).toHaveText("Add Employee");

});

test('TCME-0004 | Verify Reports Menu', async ({page}) => {
    await page.getByRole("link", { name: "Reports", exact: true }).click()
    await expect(page.getByRole("heading", { name: "Employee Reports", exact: true })).toHaveText("Employee Reports");

});