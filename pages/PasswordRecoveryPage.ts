import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class PasswordRecoveryPage extends BasePage {
  readonly emailInput: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    super(page);
    this.emailInput = page.locator('#Email');
    this.result = page.locator('.result');
  }

  async request(email: string): Promise<void> {
    await this.emailInput.fill(email);
    await this.page.locator('input.password-recovery-button').click();
  }
}
