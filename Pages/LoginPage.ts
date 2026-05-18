import { Page, expect, Locator } from '@playwright/test';
import { logger } from '../Util/Logger';

export class LoginPage {
  usernameInput: Locator;
  passwordInput: Locator;
  loginBtn: Locator;
  errorBanner: Locator;

  constructor(private page: Page) {
    this.usernameInput = this.page.locator('input[name="username"]');
    this.passwordInput = this.page.locator('input[name="password"]');
    this.loginBtn = this.page.locator('input[value="Log In"]');
    this.errorBanner = this.page.locator('p.error');
  }

  async navigateToHome() {
    await this.page.goto('/parabank/index.htm');
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username);
    await this.passwordInput.fill(password);
    await this.loginBtn.click();
  }

  async verifyLoginSuccess() {
    await expect(this.page).toHaveURL(/.*overview.htm/);
    const overviewTitle = this.page.locator('h1.title');
    await expect(overviewTitle.first()).toHaveText('Accounts Overview');
  }

  async verifyInvalidLoginError(expectedError: string) {
    logger.info('Checking error message for invalid login');
    await expect(this.errorBanner).toBeVisible();
    await expect(this.errorBanner).toHaveText(expectedError);
  }
}
