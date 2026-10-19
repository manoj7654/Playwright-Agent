import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class WishlistPage extends BasePage {
  readonly emptyMessage: Locator;
  readonly headerCount: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyMessage = page.getByText('The wishlist is empty!', { exact: true });
    this.headerCount = page.locator('.ico-wishlist');
  }

  async goto(): Promise<void> {
    await this.open('/wishlist');
  }

  productRow(name: string): Locator {
    return this.page.locator('.cart tbody tr').filter({ hasText: name });
  }

  async removeProduct(name: string): Promise<void> {
    await this.productRow(name).locator('input[name="removefromcart"]').check();
    await this.page.locator('input[name="updatecart"]').click();
  }
}
