import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class SearchPage extends BasePage {
  readonly searchInput: Locator;
  readonly noResultsMessage: Locator;
  readonly productCards: Locator;

  constructor(page: Page) {
    super(page);
    this.searchInput = page.locator('#small-searchterms');
    this.noResultsMessage = page.getByText('No products were found that matched your criteria.', { exact: true });
    this.productCards = page.locator('.product-item');
  }

  async gotoStorefront(): Promise<void> {
    await this.open('/');
  }

  async search(term: string): Promise<void> {
    await this.gotoStorefront();
    await this.searchInput.fill(term);
    await this.page.locator('input.search-box-button').click();
  }

  resultLink(name: string): Locator {
    return this.page.getByRole('link', { name, exact: true });
  }

  async openResult(name: string): Promise<void> {
    await this.resultLink(name).click();
  }
}
