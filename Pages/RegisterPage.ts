import { Page, expect, Locator } from '@playwright/test';
import { logger } from '../Util/Logger';

export class RegisterPage {
  firstNameInput: Locator;
  lastNameInput: Locator;
  streetInput: Locator;
  cityInput: Locator;
  stateInput: Locator;
  zipCodeInput: Locator;
  phoneInput: Locator;
  ssnInput: Locator;
  usernameInput: Locator;
  passwordInput: Locator;
  confirmPasswordInput: Locator;
  registerBtn: Locator;
  duplicateUsernameError: Locator;

  constructor(private page: Page) {
    this.firstNameInput = this.page.locator('input[id="customer.firstName"]');
    this.lastNameInput = this.page.locator('input[id="customer.lastName"]');
    this.streetInput = this.page.locator('input[id="customer.address.street"]');
    this.cityInput = this.page.locator('input[id="customer.address.city"]');
    this.stateInput = this.page.locator('input[id="customer.address.state"]');
    this.zipCodeInput = this.page.locator('input[id="customer.address.zipCode"]');
    this.phoneInput = this.page.locator('input[id="customer.phoneNumber"]');
    this.ssnInput = this.page.locator('input[id="customer.ssn"]');
    this.usernameInput = this.page.locator('input[id="customer.username"]');
    this.passwordInput = this.page.locator('input[id="customer.password"]');
    this.confirmPasswordInput = this.page.locator('input[id="repeatedPassword"]');
    this.registerBtn = this.page.locator('input[value="Register"]');
    this.duplicateUsernameError = this.page.locator('span[id="customer.username.errors"]');
  }

  async navigateToRegisterPage() {
    logger.info('Going to Register page');
    await this.page.goto('/parabank/register.htm');
  }

  async registerUser(userData: any) {
    logger.info(`Filling registration form for ${userData.username}`);
    await this.firstNameInput.fill(userData.firstName);
    await this.lastNameInput.fill(userData.lastName);
    await this.streetInput.fill(userData.address);
    await this.cityInput.fill(userData.city);
    await this.stateInput.fill(userData.state);
    await this.zipCodeInput.fill(userData.zipCode);
    await this.phoneInput.fill(userData.phone);
    await this.ssnInput.fill(userData.ssn);
    await this.usernameInput.fill(userData.username);

    const targetPassword = userData.password;
    await this.passwordInput.fill(targetPassword);

    await this.confirmPasswordInput.fill(targetPassword);

    await this.registerBtn.click();
  }

  async verifyBlankFieldValidationErrors(msg: any) {
    logger.info('Checking required field error messages');
    await expect(this.page.locator("//span[@id='customer.firstName.errors']")).toHaveText(msg.firstName);
    await expect(this.page.locator("//span[@id='customer.lastName.errors']")).toHaveText(msg.lastName);
    await expect(this.page.locator("//span[@id='customer.address.street.errors']")).toHaveText(msg.address);
    await expect(this.page.locator("//span[@id='customer.address.city.errors']")).toHaveText(msg.city);
    await expect(this.page.locator("//span[@id='customer.address.state.errors']")).toHaveText(msg.state);
    await expect(this.page.locator("//span[@id='customer.address.zipCode.errors']")).toHaveText(msg.zipCode);
    await expect(this.page.locator("//span[@id='customer.ssn.errors']")).toHaveText(msg.ssn);
    await expect(this.page.locator("//span[@id='customer.username.errors']")).toHaveText(msg.username);
    await expect(this.page.locator("//span[@id='customer.password.errors']")).toHaveText(msg.password);
    await expect(this.page.locator("//span[@id='repeatedPassword.errors']")).toHaveText(msg.passwordConfirmation);
  }

  async verifyDuplicateUsernameError() {
    await expect(this.duplicateUsernameError).toBeVisible();
    await expect(this.duplicateUsernameError).toHaveText('This username already exists.');
  }

  async verifyRegistrationSuccess() {
    logger.info('Checking registration success message');
    const successTitle = this.page.locator('#rightPanel h1.title');
    await expect(successTitle).toContainText('Welcome');
  }
}
