import { Page, expect, Locator } from '@playwright/test';
import { logger } from '../Util/Logger';

export class OpenAccountPage {
  accountTypeDropdown: Locator;
  fundingAccountDropdown: Locator;
  submitAccountBtn: Locator;
  successTitle: Locator;
  successParagraph: Locator;
  dynamicNewAccountId: Locator;
  lastCreatedAccountId: string = '';

  constructor(private page: Page) {
    this.accountTypeDropdown = this.page.locator('#type');
    this.fundingAccountDropdown = this.page.locator('#fromAccountId');
    this.submitAccountBtn = this.page.locator('input[value="Open New Account"]');
    this.successTitle = this.page.locator('.title');
    this.successParagraph = this.page.locator('p');
    this.dynamicNewAccountId = this.page.locator('#rightPanel #newAccountId');
  }

  async navigateToOpenAccountPage() {
    logger.info('Going to Open New Account page');
    await this.page.click('a[href*="openaccount.htm"]');
  }

  async createNewAccount(accountType: '0' | '1', sourceAccountId?: string) {
    logger.info(`Selecting account type: ${accountType === '0' ? 'CHECKING' : 'SAVINGS'}`);

    await this.accountTypeDropdown.waitFor({ state: 'visible' });
    await this.accountTypeDropdown.selectOption(accountType);

    if (sourceAccountId) {
      logger.info(`Selecting funding account: ${sourceAccountId}`);
      await this.fundingAccountDropdown.waitFor({ state: 'visible' });
      await this.fundingAccountDropdown.selectOption(sourceAccountId);
    }

    await expect(this.accountTypeDropdown).toHaveValue(accountType);

    const responsePromise = this.page.waitForResponse(
      response => response.url().includes('/createAccount') && response.status() === 200,
      { timeout: 10000 }
    ).catch(() => null);

    await this.submitAccountBtn.click();

    const response = await responsePromise;
    if (response) {
      try {
        const data = await response.json();
        this.lastCreatedAccountId = data.id ? data.id.toString() : '';
        logger.info('New account ID: ' + this.lastCreatedAccountId);
      } catch (e) {
        logger.error('Could not get new account ID from API');
      }
    }
  }

  async verifyAccountCreationSuccess() {
    const successHeader = this.page.locator('h1:has-text("Account Opened!")');
    await expect(successHeader).toHaveText('Account Opened!');

    const specificSuccessParagraph = this.page.locator('p:has-text("Congratulations, your account is now open.")');
    await expect(specificSuccessParagraph).toHaveText('Congratulations, your account is now open.');
  }
}