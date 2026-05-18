import { test } from '@playwright/test';
import { LoginPage } from '../../Pages/LoginPage';
import { OpenAccountPage } from '../../Pages/OpenAccountPage';
import { logger } from '../../Util/Logger';
import testData from '../../test_data/login.json';

test.describe('TS-01: Demo User Login and Account Tests', () => {
  let loginPage: LoginPage;
  let openAccountPage: OpenAccountPage;

  test.beforeEach(async ({ page }) => {
    loginPage = new LoginPage(page);
    openAccountPage = new OpenAccountPage(page);

    await loginPage.navigateToHome();
  });

  test('TC-01: Login with valid credentials', async () => {

    const username = testData.demoUser.username;
    const password = testData.demoUser.password;

    await loginPage.login(username, password);
    await loginPage.verifyLoginSuccess();
  });

  test('TC-02: Login with invalid credentials shows error', async () => {

    const username = testData.invalidLogin.username;
    const password = testData.invalidLogin.password;
    const errorMessage = testData.invalidLogin.expectedError;

    await loginPage.login(username, password);
    await loginPage.verifyInvalidLoginError(errorMessage);
  });

  test('TC-03: Login and open a new SAVINGS account', async () => {

    const username = testData.demoUser.username;
    const password = testData.demoUser.password;
    await loginPage.login(username, password);

    await loginPage.verifyLoginSuccess();
    await openAccountPage.navigateToOpenAccountPage();
    await openAccountPage.createNewAccount('1');

    const savingsAccountId = await openAccountPage.verifyAccountCreationSuccess();
    logger.info(`New SAVINGS account ID: ${savingsAccountId}`);
  });

  test('TC-04: Login and open a new CHECKING account', async () => {

    const username = testData.demoUser.username;
    const password = testData.demoUser.password;

    await loginPage.login(username, password);
    await loginPage.verifyLoginSuccess();

    await openAccountPage.navigateToOpenAccountPage();
    await openAccountPage.createNewAccount('0');

    const checkingAccountId = await openAccountPage.verifyAccountCreationSuccess();
    logger.info(`New CHECKING account ID: ${checkingAccountId}`);
  });
});
