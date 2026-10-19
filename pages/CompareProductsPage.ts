import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CompareProductsPage extends BasePage {
  readonly priceRow: Locator;

  constructor(page: Page) {
    super(page);
    this.priceRow = page.locator('.compare-products-table tr').filter({ hasText: 'Price' });
  }

  async goto(): Promise<void> {
    await this.open('/compareproducts');
  }

  productColumn(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  async removeProduct(name: string): Promise<void> {
    const targetColumn = this.page
      .locator('.compare-products-table th, .compare-products-table td')
      .filter({ hasText: name })
      .first();
    const index = await targetColumn.evaluate((cell) =>
      Array.from(cell.parentElement?.children ?? []).indexOf(cell),
    );
    await this.page.locator('.compare-products-table .remove-button').nth(index - 1).click();
  }
}
