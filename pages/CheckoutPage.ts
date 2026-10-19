import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export interface CheckoutAddress {
  firstName: string;
  lastName: string;
  email: string;
  country: string;
  state: string;
  city: string;
  address: string;
  postalCode: string;
  phone: string;
}

export class CheckoutPage extends BasePage {
  readonly billingAddressForm: Locator;
  readonly orderReview: Locator;
  readonly confirmationHeading: Locator;
  readonly confirmationMessage: Locator;

  constructor(page: Page) {
    super(page);
    this.billingAddressForm = page.locator('#BillingNewAddress_FirstName');
    this.orderReview = page.locator('.page');
    this.confirmationHeading = page.getByRole('heading', { name: 'Thank you' });
    this.confirmationMessage = page.getByText('Your order has been successfully processed!', { exact: true });
  }

  async continueAsGuest(): Promise<void> {
    await this.page.locator('input.checkout-as-guest-button').click();
  }

  async fillBillingAddress(address: CheckoutAddress): Promise<void> {
    await this.page.locator('#BillingNewAddress_FirstName').fill(address.firstName);
    await this.page.locator('#BillingNewAddress_LastName').fill(address.lastName);
    await this.page.locator('#BillingNewAddress_Email').fill(address.email);
    await this.page.locator('#BillingNewAddress_City').fill(address.city);
    await this.page.locator('#BillingNewAddress_Address1').fill(address.address);
    await this.page.locator('#BillingNewAddress_ZipPostalCode').fill(address.postalCode);
    await this.page.locator('#BillingNewAddress_PhoneNumber').fill(address.phone);
    await this.page.locator('#BillingNewAddress_CountryId').selectOption({ label: address.country });
    await this.page.locator('#BillingNewAddress_StateProvinceId').selectOption({ label: address.state });
    await this.page.locator('input.new-address-next-step-button').first().click();
  }

  async continueWithShippingAddress(): Promise<void> {
    await this.page.locator('input.new-address-next-step-button').nth(1).click();
  }

  async continueWithDefaultShipping(): Promise<void> {
    await this.page.locator('input.shipping-method-next-step-button').click();
  }

  async selectPaymentMethod(method: 'Check / Money Order' | 'Cash On Delivery (COD)'): Promise<void> {
    const value = method === 'Check / Money Order' ? 'Payments.CheckMoneyOrder' : 'Payments.CashOnDelivery';
    await this.page.locator(`input[name="paymentmethod"][value="${value}"]`).check();
    await this.page.locator('input.payment-method-next-step-button').click();
  }

  async continuePaymentInformation(): Promise<void> {
    await this.page.locator('input.payment-info-next-step-button').click();
  }

  async confirmOrder(): Promise<void> {
    await this.page.locator('input.confirm-order-next-step-button').click();
  }

  async readOrderNumber(): Promise<string> {
    const text = await this.page.getByText(/Order number:/i).textContent();
    const match = text?.match(/[0-9]+/);
    if (!match) {
      throw new Error('Order confirmation did not include an order number.');
    }
    return match[0];
  }
}
