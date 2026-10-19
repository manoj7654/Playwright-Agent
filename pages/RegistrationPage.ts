import { type Locator, type Page } from '@playwright/test';
import { BasePage } from './BasePage';

export class RegistrationPage extends BasePage {
  readonly firstNameInput: Locator;
  readonly lastNameInput: Locator;
  readonly emailInput: Locator;
  readonly passwordInput: Locator;
  readonly confirmPasswordInput: Locator;
  readonly validationMessages: Locator;
  readonly firstNameError: Locator;
  readonly emailError: Locator;
  readonly wrongEmailError: Locator;
  readonly passwordConfirmationError: Locator;
  readonly registrationResult: Locator;
  

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator('#FirstName');
    this.lastNameInput = page.locator('#LastName');
    this.emailInput = page.locator('#Email');
    this.passwordInput = page.locator('#Password');
    this.confirmPasswordInput = page.locator('#ConfirmPassword');
    this.validationMessages = page.locator('.field-validation-error, .message-error');
    this.firstNameError = page.getByText('First name is required.', { exact: true });
    this.emailError = page.getByText('Email is required.', { exact: true });
    this.wrongEmailError = page.getByText('Wrong email', { exact: true });
    this.passwordConfirmationError = page.getByText(
      'The password and confirmation password do not match.',
      { exact: true },
    );
    this.registrationResult = page.locator('.result');
  }

  async goto(): Promise<void> {
    await this.open('/register');
  }

  async fillPersonalDetails(firstName: string, lastName: string, email: string): Promise<void> {
    await this.firstNameInput.fill(firstName);
    await this.lastNameInput.fill(lastName);
    await this.emailInput.fill(email);
  }

  async fillPasswords(password: string, confirmation: string): Promise<void> {
    await this.passwordInput.fill(password);
    await this.confirmPasswordInput.fill(confirmation);
  }

  async submit(): Promise<void> {
    await this.page.locator('#register-button').click();
  }

  async register(firstName: string, lastName: string, email: string, password: string): Promise<void> {
    await this.fillPersonalDetails(firstName, lastName, email);
    await this.fillPasswords(password, password);
    await this.submit();
  }

  async logOut(): Promise<void> {
    await this.page.getByRole('link', { name: 'Log out' }).click();
  }
}
