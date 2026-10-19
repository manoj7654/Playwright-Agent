import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface GiftCardDetails {
  recipientName: string;
  recipientEmail: string;
  senderName: string;
  senderEmail: string;
  message: string;
}

export class GiftCardPage extends BasePage {
  readonly heading: Locator;
  readonly recipientName: Locator;
  readonly recipientEmail: Locator;
  readonly senderName: Locator;
  readonly senderEmail: Locator;
  readonly message: Locator;
  readonly addToWishlistButton: Locator;

  constructor(page: Page) {
    super(page);
    this.heading = page.getByRole('heading', { level: 1 });
    this.recipientName = page.locator('#giftcard_2_RecipientName');
    this.recipientEmail = page.locator('#giftcard_2_RecipientEmail');
    this.senderName = page.locator('#giftcard_2_SenderName');
    this.senderEmail = page.locator('#giftcard_2_SenderEmail');
    this.message = page.locator('#giftcard_2_Message');
    this.addToWishlistButton = page.locator('#add-to-wishlist-button-2');
  }

  async goto(slug: string): Promise<void> {
    await this.open(`/${slug}`);
  }

  private async fillDetails(details: GiftCardDetails): Promise<void> {
    await this.recipientName.fill(details.recipientName);
    await this.recipientEmail.fill(details.recipientEmail);
    await this.senderName.fill(details.senderName);
    await this.senderEmail.fill(details.senderEmail);
    await this.message.fill(details.message);
  }

  async configureAndAdd(details: GiftCardDetails): Promise<void> {
    await this.fillDetails(details);
    await this.page.locator('#add-to-cart-button-2').click();
  }

  async configureAndAddToWishlist(details: GiftCardDetails): Promise<void> {
    await this.fillDetails(details);
    await this.addToWishlistButton.click();
  }
}
