# Instructions

- Following Playwright test failed.
- Explain why, be concise, respect Playwright best practices.
- Provide a snippet of code with the fix, if possible.

# Test info

- Name: UI\register.spec.ts >> TS-02: User Registration >> TC-06: Check blank field errors on registration page
- Location: tests\UI\register.spec.ts:43:8

# Error details

```
Error: expect(locator).toContainText(expected) failed

Locator: locator('#rightPanel h1.title')
Expected substring: "Welcome"
Received string:    "Signing up is easy!"
Timeout: 5000ms

Call log:
  - Expect "toContainText" with timeout 5000ms
  - waiting for locator('#rightPanel h1.title')
    12 × locator resolved to <h1 class="title">Signing up is easy!</h1>
       - unexpected value "Signing up is easy!"

```

```yaml
- heading "Signing up is easy!" [level=1]
```

# Test source

```ts
  1  | import { Page, expect, Locator } from '@playwright/test';
  2  | import { logger } from '../Util/Logger';
  3  | 
  4  | export class RegisterPage {
  5  |   firstNameInput: Locator;
  6  |   lastNameInput: Locator;
  7  |   streetInput: Locator;
  8  |   cityInput: Locator;
  9  |   stateInput: Locator;
  10 |   zipCodeInput: Locator;
  11 |   phoneInput: Locator;
  12 |   ssnInput: Locator;
  13 |   usernameInput: Locator;
  14 |   passwordInput: Locator;
  15 |   confirmPasswordInput: Locator;
  16 |   registerBtn: Locator;
  17 |   duplicateUsernameError: Locator;
  18 | 
  19 |   constructor(private page: Page) {
  20 |     this.firstNameInput = this.page.locator('input[id="customer.firstName"]');
  21 |     this.lastNameInput = this.page.locator('input[id="customer.lastName"]');
  22 |     this.streetInput = this.page.locator('input[id="customer.address.street"]');
  23 |     this.cityInput = this.page.locator('input[id="customer.address.city"]');
  24 |     this.stateInput = this.page.locator('input[id="customer.address.state"]');
  25 |     this.zipCodeInput = this.page.locator('input[id="customer.address.zipCode"]');
  26 |     this.phoneInput = this.page.locator('input[id="customer.phoneNumber"]');
  27 |     this.ssnInput = this.page.locator('input[id="customer.ssn"]');
  28 |     this.usernameInput = this.page.locator('input[id="customer.username"]');
  29 |     this.passwordInput = this.page.locator('input[id="customer.password"]');
  30 |     this.confirmPasswordInput = this.page.locator('input[id="repeatedPassword"]');
  31 |     this.registerBtn = this.page.locator('input[value="Register"]');
  32 |     this.duplicateUsernameError = this.page.locator('span[id="customer.username.errors"]');
  33 |   }
  34 | 
  35 |   async navigateToRegisterPage() {
  36 |     logger.info('Going to Register page');
  37 |     await this.page.goto('/parabank/register.htm');
  38 |   }
  39 | 
  40 |   async registerUser(userData: any) {
  41 |     logger.info(`Filling registration form for ${userData.username}`);
  42 |     await this.firstNameInput.fill(userData.firstName);
  43 |     await this.lastNameInput.fill(userData.lastName);
  44 |     await this.streetInput.fill(userData.address);
  45 |     await this.cityInput.fill(userData.city);
  46 |     await this.stateInput.fill(userData.state);
  47 |     await this.zipCodeInput.fill(userData.zipCode);
  48 |     await this.phoneInput.fill(userData.phone);
  49 |     await this.ssnInput.fill(userData.ssn);
  50 |     await this.usernameInput.fill(userData.username);
  51 | 
  52 |     const targetPassword = userData.password;
  53 |     await this.passwordInput.fill(targetPassword);
  54 | 
  55 |     await this.confirmPasswordInput.fill(targetPassword);
  56 | 
  57 |     await this.registerBtn.click();
  58 |   }
  59 | 
  60 |   async verifyBlankFieldValidationErrors(msg: any) {
  61 |     logger.info('Checking required field error messages');
  62 |     await expect(this.page.locator("//span[@id='customer.firstName.errors']")).toHaveText(msg.firstName);
  63 |     await expect(this.page.locator("//span[@id='customer.lastName.errors']")).toHaveText(msg.lastName);
  64 |     await expect(this.page.locator("//span[@id='customer.address.street.errors']")).toHaveText(msg.address);
  65 |     await expect(this.page.locator("//span[@id='customer.address.city.errors']")).toHaveText(msg.city);
  66 |     await expect(this.page.locator("//span[@id='customer.address.state.errors']")).toHaveText(msg.state);
  67 |     await expect(this.page.locator("//span[@id='customer.address.zipCode.errors']")).toHaveText(msg.zipCode);
  68 |     await expect(this.page.locator("//span[@id='customer.ssn.errors']")).toHaveText(msg.ssn);
  69 |     await expect(this.page.locator("//span[@id='customer.username.errors']")).toHaveText(msg.username);
  70 |     await expect(this.page.locator("//span[@id='customer.password.errors']")).toHaveText(msg.password);
  71 |     await expect(this.page.locator("//span[@id='repeatedPassword.errors']")).toHaveText(msg.passwordConfirmation);
  72 |   }
  73 | 
  74 |   async verifyDuplicateUsernameError() {
  75 |     await expect(this.duplicateUsernameError).toBeVisible();
  76 |     await expect(this.duplicateUsernameError).toHaveText('This username already exists.');
  77 |   }
  78 | 
  79 |   async verifyRegistrationSuccess() {
  80 |     logger.info('Checking registration success message');
  81 |     const successTitle = this.page.locator('#rightPanel h1.title');
> 82 |     await expect(successTitle).toContainText('Welcome');
     |                                ^ Error: expect(locator).toContainText(expected) failed
  83 |   }
  84 | }
  85 | 
```