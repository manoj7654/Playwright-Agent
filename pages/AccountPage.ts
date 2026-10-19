import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class AccountPage extends BasePage {
  readonly orderList: Locator;

  constructor(page: Page) {
    super(page);
    this.orderList = page.locator('.order-list');
  }

  async openOrders(): Promise<void> {
    await this.open('/customer/orders');
  }
}
