import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly loginError: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.loginError = page.locator('.message-error');
  }

  async goto(): Promise<void> {
    await this.open('/login');
  }

  async signIn(email: string, password: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.passwordInput.fill(password);
    await this.page.locator('input.login-button').click();
  }

  async openPasswordRecovery(): Promise<void> {
    await this.page.getByRole('link', { name: 'Forgot password?' }).click();
  }
}
