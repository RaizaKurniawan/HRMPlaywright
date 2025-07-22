import {test, expect} from '@playwright/test';
import { login, clickSave, personalIdManagement,
    clickAdd, createLoginDetail, fillTheForm, errorRequired,
    passwordNotMatch, clickCancel, clickSearch} from '../../helper/helpers';
const path = require('path')

test.beforeEach(async ({page}) => {
    await login(page)
    await personalIdManagement(page)

})

test('TCEM-0001 | Successful to Add New Employee', async ({ page }) => {
    await clickAdd(page);

    // Fill the form
    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("First Name", { exact: true }).fill('Rose')
    await page.waitForTimeout(500);
    await page.getByPlaceholder("Middle Name", { exact: true }).fill('Maria')
    await page.getByPlaceholder("Last Name", { exact: true }).fill('Sousa')
    await page.waitForTimeout(500);
    await expect(page.getByText("Employee Id", { exact: true })).toHaveText('Employee Id')

    // Create Login Details
    const fields = await createLoginDetail(page);
    // Fill username, password, and confirm password
    await fields.username.fill('rosemariasousa');
    await fields.password.fill('%$RoseMariasousa*7!')
    await fields.confirmPassword.fill('%$RoseMariasousa*7!')

    // upload image
    const fileChooserPromise = page.waitForEvent('filechooser');
    await page.locator("i.oxd-icon.bi-plus").click()
    const fileChooser = await fileChooserPromise;
    await fileChooser.setFiles(path.join(__dirname, 'user.png'));

    await page.waitForTimeout(5000);
    await clickSave(page);
    await page.waitForLoadState('networkidle');
    await expect(page.getByRole("heading", { name: "Personal Details", exact: true })).toHaveText("Personal Details")
});

test('TCEM-0001A | Verify The Data New Employee', async ({page}) => {
    await expect(page.getByRole("heading", { name: "Employee Information", exact: true })).toHaveText("Employee Information")
    await page.getByPlaceholder("Type for hints...", { exact: true }).first().fill('Rose Maria')
    await clickSearch(page);
    await expect(page.getByText("(1) Record Found", { exact: true })).toHaveText('(1) Record Found')
    await expect(page.getByText("Rose Maria", { exact: true })).toHaveText("Rose Maria")
})

test('TCEM-0002 | First Name Required', async ({page}) => {
    await clickAdd(page);

    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("Last Name", { exact: true }).fill('Angel')
    await page.waitForTimeout(500);

    await clickSave(page);
    await errorRequired(page);
})

test('TCEM-0003 | Last Name Required', async ({page}) => {
    await clickAdd(page);

    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.getByPlaceholder("First Name", { exact: true }).fill('Rose')
    await page.waitForTimeout(500);

    await clickSave(page);
    await errorRequired(page);
})

test('TCEM-0004 | First and Last Name are Required', async ({page}) => {
    await clickAdd(page);
    await expect(page.getByText("Employee Full Name", { exact: true })).toHaveText('Employee Full Name')
    await page.waitForTimeout(500);

    await clickSave(page);
    await expect(page.getByText('Required').first()).toHaveText('Required')
    await expect(page.getByText('Required').nth(1)).toHaveText("Required")
})

test('TCEM-0005 | Username Required', async ({page}) => {
    await clickAdd(page);
    await fillTheForm(page);
    const fields = await createLoginDetail(page);

    await fields.password.fill('RoseMariasousa*7')
    await fields.confirmPassword.fill('RoseMariasousa*7')

    await clickSave(page);
    await errorRequired(page)
})

test('TCEM-0006 | Password Required', async ({page}) => {
    await clickAdd(page);
    await fillTheForm(page);
    const fields = await createLoginDetail(page);

    await fields.username.fill('RoseMariasousa')
    await fields.confirmPassword.fill('RoseMariasousa*7')

    await clickSave(page);
    await errorRequired(page);
})

test('TCEM-0007 | Password do not match', async ({page}) => {
    await clickAdd(page);
    await fillTheForm(page);
    const fields = await createLoginDetail(page);

    await fields.username.fill('rosemariasousa');
    await fields.password.fill('RoseMariasousa*7')
    await fields.confirmPassword.fill('RoseMariasousa')

    await clickSave(page)
    //Show error text
    await passwordNotMatch(page);
})

test('TCEM-0008 | Verify User Successful back to Employee List', async ({page}) => {
    await clickAdd(page);
    await clickCancel(page)
})