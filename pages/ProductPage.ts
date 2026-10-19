import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class ProductPage extends BasePage {
  readonly heading: Locator;
  readonly description: Locator;
  readonly availability: Locator;
  readonly quantityInput: Locator;
  readonly addToCartButton: Locator;
  readonly addToWishlistButton: Locator;
  readonly addReviewLink: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.description = page.locator('.full-description, .short-description').first();
    this.availability = page.getByText('Availability: In stock', { exact: true });
    this.quantityInput = page.locator('.product-essential .qty-input').first();
    this.addToCartButton = page.locator('.product-essential .add-to-cart-button').first();
    this.addToWishlistButton = page.locator('.product-details-page .add-to-wishlist-button').first();
    this.addReviewLink = page.getByRole('link', { name: 'Add your review' });
  }

  async goto(slug: string): Promise<void> {
    await this.open(`/${slug}`);
  }

  async addToCart(quantity: number): Promise<void> {
    await this.quantityInput.fill(String(quantity));
    await this.addToCartButton.click();
  }

  async addToWishlist(): Promise<void> {
    await this.addToWishlistButton.click();
  }

  async addToCompareList(): Promise<void> {
    await this.page.locator('.add-to-compare-list-button').click();
  }

  async openReviewForm(): Promise<void> {
    await this.addReviewLink.click();
  }
}
