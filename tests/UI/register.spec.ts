import { test } from '@playwright/test';
import { RegisterPage } from '../../Pages/RegisterPage';
import { LoginPage } from '../../Pages/LoginPage';
import { OpenAccountPage } from '../../Pages/OpenAccountPage';
// import { logger } from '../../Util/Logger';
import testData from '../../test_data/login.json';

test.describe('TS-02: User Registration', () => {
  let registerPage: RegisterPage;
  let loginPage: LoginPage;
  let openAccountPage: OpenAccountPage;
  let uniqueUserPayload: any;

  test.beforeEach(async ({ page }) => {
    registerPage = new RegisterPage(page);
    loginPage = new LoginPage(page);

    openAccountPage = new OpenAccountPage(page);

    // Generate unique username for each test
    const username = 'user_' + Math.random().toString(36).substring(2, 8);
    uniqueUserPayload = {
      firstName: testData.validUser.firstName,
      lastName: testData.validUser.lastName,
      address: testData.validUser.address,
      city: testData.validUser.city,
      state: testData.validUser.state,
      zipCode: testData.validUser.zipCode,
      phone: testData.validUser.phone,
      ssn: testData.validUser.ssn,
      username: username,
      password: testData.validUser.password
    };
  });

  test('TC-05: Register a new user successfully', async () => {
    await registerPage.navigateToRegisterPage();

    await registerPage.registerUser(uniqueUserPayload);
    await registerPage.verifyRegistrationSuccess();
  });

  test.fail('TC-06: Check blank field errors on registration page', async () => {

    await registerPage.navigateToRegisterPage();
    await registerPage.registerBtn.click();

    await registerPage.verifyRegistrationSuccess();
  });

  test('TC-07: Try to register with valid credentials and open a SAVINGS account', async () => {
    const duplicatePayload = { 
      ...testData.validUser, 
      username: testData.demoUser.username, 
      password: testData.demoUser.password 
    };
    
    // Attempt duplicate registration
    await registerPage.navigateToRegisterPage();
    await registerPage.registerUser(duplicatePayload);
    await registerPage.verifyDuplicateUsernameError();

    // Login with credentials
    await loginPage.navigateToHome();
    await loginPage.login(testData.demoUser.username, testData.demoUser.password);
    await loginPage.verifyLoginSuccess();

    // Open Savings Account
    await openAccountPage.navigateToOpenAccountPage();
    await openAccountPage.createNewAccount('1', '');
    await openAccountPage.verifyAccountCreationSuccess();
  });

  test('TC-08: Try to register with an existing username, then login and open a CHECKING account', async () => {
    const duplicatePayload = { 
      ...testData.validUser, 
       username: testData.demoUser.username, 
       password: testData.demoUser.password 
      };
    
    await registerPage.navigateToRegisterPage();
    await registerPage.registerUser(duplicatePayload);
    await registerPage.verifyDuplicateUsernameError();

    await loginPage.navigateToHome();
    await loginPage.login(testData.demoUser.username, testData.demoUser.password);
    await loginPage.verifyLoginSuccess();

    await openAccountPage.navigateToOpenAccountPage();
    await openAccountPage.createNewAccount('0', '');
    await openAccountPage.verifyAccountCreationSuccess();
  });
});
