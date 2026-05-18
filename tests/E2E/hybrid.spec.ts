import { test as base, expect } from '@playwright/test';
import { test } from '../../Fixtures/api.fixture';
import { logger } from '../../Util/Logger';
import testData from '../../test_data/login.json';
import { OpenAccountPage } from '../../Pages/OpenAccountPage';
import { LoginPage } from '../../Pages/LoginPage';

test.describe('TS-05: Hybrid UI and API tests', () => {


  test.beforeEach(async ({ page }) => {
    const loginPage = new LoginPage(page);
    await loginPage.navigateToHome();
    await loginPage.login(testData.demoUser.username, testData.demoUser.password);
  });


  test('TC-13: Verify account created in UI matches API response', async ({ page, apiRequest }) => {

    const sourceAccountId = testData.apiTestData.validAccountId;
    const openAccountPage = new OpenAccountPage(page);

    // Create account id
    await openAccountPage.navigateToOpenAccountPage();
    await openAccountPage.createNewAccount('1', sourceAccountId); 
    await openAccountPage.verifyAccountCreationSuccess();

    // Capture account id
    await openAccountPage.dynamicNewAccountId.waitFor({ state: 'visible' });
    const newAccountId = await openAccountPage.dynamicNewAccountId.innerText();
    logger.info(`New account created via UI. Captured ID: ${newAccountId}`);

    // Verify using api
    const res = await apiRequest.get(`accounts/${newAccountId}`);
    expect(res.status()).toBe(200);

    const body = await res.text();
    logger.info('API Response for new account:\n' + body);

    // Assert 
    expect(body).toContain(`<id>${newAccountId}</id>`);
    expect(body).toContain('<type>SAVINGS</type>');
  });
});
