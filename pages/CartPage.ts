import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class CartPage extends BasePage {
  readonly emptyMessage: Locator;
  readonly termsCheckbox: Locator;
  readonly termsDialog: Locator;
  readonly couponInput: Locator;
  readonly couponError: Locator;
  readonly countrySelect: Locator;
  readonly stateSelect: Locator;
  readonly postalCodeInput: Locator;
  readonly shippingResults: Locator;
  readonly orderTotal: Locator;
  readonly headerItemCount: Locator;

  constructor(page: Page) {
    super(page);
    this.emptyMessage = page.getByText('Your Shopping Cart is empty!', { exact: true });
    this.termsCheckbox = page.locator('#termsofservice');
    this.termsDialog = page.getByRole('dialog', { name: 'Terms of service' });
    this.couponInput = page.locator('input[name="discountcouponcode"]');
    this.couponError = page.locator('.coupon-box').getByText(
      "The coupon code you entered couldn't be applied to your order",
      { exact: true },
    );
    this.countrySelect = page.locator('#CountryId');
    this.stateSelect = page.locator('#StateProvinceId');
    this.postalCodeInput = page.locator('#ZipPostalCode');
    this.shippingResults = page.locator('.shipping-results');
    this.orderTotal = page.locator('.cart-total');
    this.headerItemCount = page.locator('.ico-cart');
  }

  async goto(): Promise<void> {
    await this.open('/cart');
  }

  productRow(name: string): Locator {
    return this.page.locator('.cart tbody tr').filter({ hasText: name });
  }

  productQuantity(name: string): Locator {
    return this.productRow(name).locator('input.qty-input');
  }

  productUnitPrice(name: string): Locator {
    return this.productRow(name).locator('td').nth(2);
  }

  productLineTotal(name: string): Locator {
    return this.productRow(name).locator('td').nth(4);
  }

  async setQuantity(name: string, quantity: number): Promise<void> {
    await this.productQuantity(name).fill(String(quantity));
  }

  async update(): Promise<void> {
    await this.page.locator('input[name="updatecart"]').click();
  }

  async removeProduct(name: string): Promise<void> {
    await this.productRow(name).locator('input[name="removefromcart"]').check();
  }

  async applyCoupon(code: string): Promise<void> {
    await this.couponInput.fill(code);
    await this.page.locator('input[name="applydiscountcouponcode"]').click();
  }

  async estimateShipping(country: string, state: string, postalCode: string): Promise<void> {
    await this.countrySelect.selectOption({ label: country });
    await this.stateSelect.selectOption({ label: state });
    await this.postalCodeInput.fill(postalCode);
    await this.page.locator('input[name="estimateshipping"]').click();
  }

  async acceptTerms(): Promise<void> {
    await this.termsCheckbox.check();
  }

  async startCheckout(): Promise<void> {
    await this.page.locator('#checkout').click();
  }

  async closeTermsDialog(): Promise<void> {
    await this.termsDialog.getByRole('button', { name: 'close' }).click();
  }
}
