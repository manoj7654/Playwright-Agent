import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ReviewPage extends BasePage {
  readonly titleInput: Locator;
  readonly reviewTextInput: Locator;
  readonly result: Locator;

  constructor(page: Page) {
    super(page);
    this.titleInput = page.locator('#AddProductReview_Title');
    this.reviewTextInput = page.locator('#AddProductReview_ReviewText');
    this.result = page.locator('.result');
  }

  async submit(title: string, text: string, rating: number): Promise<void> {
    await this.titleInput.fill(title);
    await this.reviewTextInput.fill(text);
    await this.page.locator(`#addproductrating_${rating}`).check();
    await this.page.locator('input.write-product-review-button').click();
  }
}
