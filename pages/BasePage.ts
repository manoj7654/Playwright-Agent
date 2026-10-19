import { type Page } from '@playwright/test';

export abstract class BasePage {
  protected readonly page: Page;
  protected readonly baseUrl = 'https://demowebshop.tricentis.com';

  protected constructor(page: Page) {
    this.page = page;
  }

  protected async open(path: string): Promise<void> {
    await this.page.goto(new URL(path, this.baseUrl).toString());
  }
}
