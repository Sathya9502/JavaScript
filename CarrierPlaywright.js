const { test, expect } = require('@playwright/test');
const fs = require('fs');

// Test data
const testData = {
  email: 'bombax',
  password: 'palsoft123',
  baseUrl: 'https://partner.bombax.in/',
  ScreenName:'Contract List',
};

// Ensure folders exist
(async () => {
  await fs.promises.mkdir('./traces', { recursive: true });
  await fs.promises.mkdir('./screenshots', { recursive: true });
})();

// Login function
async function login(page) {
  console.log('🔐 Logging in...');
  await page.goto(`${testData.baseUrl}Account/Login`, { timeout: 100000 });
  await page.locator('#Email1').fill(testData.email);
  await page.locator('#Password1').fill(testData.password);
  await page.getByRole('button', { name: /sign in/i }).click();
  //await expect(page).toHaveURL(`${testData.baseUrl}Dashboard/CorpDashboard`, { timeout: 10000 });
  await page.waitForLoadState('networkidle');
}
//Naviagte To Screen Function
async function navigatetocontractlist(page) {
  
    console.log('Navigating to Contract List');
    const goScreenBox = page.getByRole('textbox', { name: /go to screen/i });
    await expect(goScreenBox).toBeVisible({ timeout: 5000 });
    await goScreenBox.fill(testData.ScreenName);
    await page.waitForTimeout(1000); // Wait for suggestions to appear
    await page.keyboard.press('ArrowDown');
    await page.keyboard.press('Enter');
    await page.waitForLoadState('networkidle');
}

//Opening Contract Creation Page Creating Contract

async function CreationOfNewContract(page) {
     await page.locator('#dropdownMenus')
    await page.click('a:has-text("New Customer Contract")');

//Main test
test('Contract Creation', async ({ page }) => {
  await login(page);
  //await expect(page).toHaveTitle(/Home/);
  console.log('Logged in Sucessfully HomePage is displaying'); 
  await navigatetocontractlist(page);
  console.log('Navigated to Contract List Successfully');
  await page.waitForLoadState('networkidle');
  await CreationOfNewContract(page);
});