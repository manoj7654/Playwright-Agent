import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CatalogPage extends BasePage {
  readonly heading: Locator;
  readonly sortOrder: Locator;
  readonly pageSize: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.sortOrder = page.locator('#products-orderby');
    this.pageSize = page.locator('#products-pagesize');
    this.productCards = page.locator('.product-item');
  }

  async gotoCategory(slug: string): Promise<void> {
    await this.open(`/${slug}`);
  }

  productLink(name: string): Locator {
    return this.page.locator('.product-title a').filter({ hasText: name });
  }

  async openProduct(name: string): Promise<void> {
    await this.productLink(name).click();
  }

  async selectSortOrder(label: string): Promise<void> {
    await this.sortOrder.selectOption({ label });
  }

  async selectPageSize(label: string): Promise<void> {
    await this.pageSize.selectOption({ label });
  }
}
