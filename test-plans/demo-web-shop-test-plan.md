# Demo Web Shop - Core End-User Test Plan

## Application Overview

A 20-scenario functional test plan for https://demowebshop.tricentis.com/, based on exploring the storefront, registration and login pages, product search/details, and populated/empty cart behavior. Scenarios are independent and should start in a fresh browser session with an empty cart and no signed-in user, except that some scenarios provision a disposable test account as part of their own setup. Use unique disposable email addresses and fictitious contact details; never use real personal or payment data. A scenario passes only when all listed expected results occur; fail if a required action is unavailable, validation is missing, state/totals are incorrect, or expected confirmation/navigation is absent. Use only the demo's test payment options and do not submit real-world payments.

## Test Scenarios

### 1. Account and customer access

**Seed:** `tests/seed.spec.ts`

#### 1.1. Registration rejects missing and invalid account details

**File:** `tests/account/registration-validation.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session and open Register.
    - expect: Registration form is displayed with the available identity, email, and password fields.
  2. Submit the form without entering required values.
    - expect: Required-field validation is shown and an account is not created.
  3. Enter an invalid email and non-matching password/confirmation values, then submit.
    - expect: Email and password confirmation validation is shown; no success state or account is created.

#### 1.2. Register a new customer account

**File:** `tests/account/register-account.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session. Open Register and enter a valid name, unique disposable email, and valid matching password and confirmation.
    - expect: All values are accepted and no validation errors remain.
  2. Submit the registration form.
    - expect: A registration success confirmation is displayed and the new account can be used to sign in. Fail if validation persists, registration fails, or success confirmation is absent.

#### 1.3. Reject invalid login credentials

**File:** `tests/account/login-invalid.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session and open Log in. Enter a syntactically valid email and incorrect password.
    - expect: Credentials are entered in the returning-customer form.
  2. Submit the login form.
    - expect: The user remains logged out and an explicit invalid-credentials message is shown. Fail if the session appears authenticated or no meaningful error is presented.

#### 1.4. Sign in with a valid account

**File:** `tests/account/login-valid.spec.ts`

**Steps:**
  1. Start from a fresh logged-out browser session. Provision or use a disposable valid test account created specifically for this scenario, then open Log in.
    - expect: The returning-customer form is available and no prior session is authenticated.
  2. Enter the test account's valid email and password, optionally enable Remember me, and submit.
    - expect: The customer is signed in and account access is available. Fail if authentication fails or the account remains inaccessible.

#### 1.5. Request password recovery

**File:** `tests/account/password-recovery.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session and open Forgot password from the login page.
    - expect: The password recovery form is displayed.
  2. Enter the email for a disposable test account and submit the request.
    - expect: The site displays its password-recovery acknowledgement without exposing account credentials. Fail if valid input is rejected without explanation or the request produces no visible result.

### 2. Catalog discovery and product interactions

**Seed:** `tests/seed.spec.ts`

#### 2.1. Browse a product category and subcategory

**File:** `tests/catalog/browse-categories.spec.ts`

**Steps:**
  1. Start from a fresh session on the storefront. Open a top-level category such as Computers and then choose one of its displayed subcategories, if present.
    - expect: The selected category/subcategory page loads with a matching heading and product listing; category navigation remains usable. Fail if category content is wrong or navigation is broken.
  2. Open a product from the listing and use browser back to return to the category.
    - expect: The product detail page corresponds to the selected listing item, and returning restores a usable category listing.

#### 2.2. Sort products and change listing size

**File:** `tests/catalog/sort-listing.spec.ts`

**Steps:**
  1. Start from a fresh session and open a populated category listing.
    - expect: The listing exposes the available sorting and page-size controls.
  2. Choose a different sort order (for example, price ascending) and verify displayed product ordering; then select a different page size if offered.
    - expect: Products are reordered consistently with the selected sort and the selected page size is applied. Fail if selection is ignored or ordering/page count does not update.

#### 2.3. Search for a product by keyword

**File:** `tests/catalog/search-match.spec.ts`

**Steps:**
  1. Start from a fresh storefront session and enter a known product name such as “Computing and Internet” in the store search box.
    - expect: The search term is entered into the visible search control.
  2. Submit the search.
    - expect: A search results page displays the matching product and its link opens the corresponding detail page. Fail if a known match is omitted or the result links to unrelated content.

#### 2.4. Handle a search with no matching products

**File:** `tests/catalog/search-no-results.spec.ts`

**Steps:**
  1. Start from a fresh storefront session and search for a distinctive nonsense phrase unlikely to exist in the catalog.
    - expect: A search results page is displayed for the entered phrase.
  2. Review the result area.
    - expect: The page clearly indicates that no products match and does not show unrelated products as matches. Fail if the page is blank, errors, or shows unrelated results without explanation.

#### 2.5. Review product details and add a chosen quantity to cart

**File:** `tests/catalog/product-details.spec.ts`

**Steps:**
  1. Start fresh and open a simple in-stock product detail page from search or a category listing.
    - expect: Product name, description, availability/price, quantity input, and purchase controls are visible.
  2. Set quantity to 2 and use Add to cart.
    - expect: The cart receives two units of the selected product and the cart item count/confirmation reflects the addition. Fail if a different product or quantity is added or no state change occurs.
  3. Return to the product and attempt to enter zero or a non-numeric quantity before adding.
    - expect: Invalid quantity is rejected or normalized according to form validation; the cart does not receive an unintended invalid quantity.

#### 2.6. Add a product to wishlist and remove it

**File:** `tests/catalog/wishlist.spec.ts`

**Steps:**
  1. Start from a fresh session with an empty wishlist and open an in-stock product detail page.
    - expect: The product detail page offers an Add to wishlist action.
  2. Add the product to the wishlist and open Wishlist.
    - expect: The chosen product appears in the wishlist and the wishlist count reflects it.
  3. Remove the product from the wishlist and update/confirm the change if requested.
    - expect: The product is removed and the wishlist shows the empty state/count. Fail if the item remains or another product is changed.

#### 2.7. Submit a product review as an authenticated customer

**File:** `tests/catalog/product-review.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session, provision a disposable test customer for this scenario, sign in, and open an in-stock product detail page.
    - expect: The product page exposes its review action and the customer is authenticated.
  2. Open Add your review, enter a valid review title and text, choose a rating, and submit.
    - expect: The review is accepted with a visible submission acknowledgement or moderation notice; entered rating/text are associated with the selected product. Fail if the form silently discards the review or accepts empty required fields.

### 3. Cart and checkout

**Seed:** `tests/seed.spec.ts`

#### 3.1. Update cart quantity and verify totals

**File:** `tests/cart/update-quantity.spec.ts`

**Steps:**
  1. Start from a fresh session and add one in-stock product to the cart.
    - expect: The cart contains the selected product with its initial quantity and correct unit price.
  2. Change the cart quantity to 3 and select Update shopping cart.
    - expect: The cart retains the product at quantity 3 and line/subtotal totals recalculate from the displayed price. Fail if the old quantity/total remains or unrelated items change.

#### 3.2. Remove an item from the shopping cart

**File:** `tests/cart/remove-item.spec.ts`

**Steps:**
  1. Start from a fresh session and add one in-stock product to the cart.
    - expect: The cart shows the selected product.
  2. Select that row's Remove checkbox and update the shopping cart.
    - expect: The item is removed and the cart displays its empty-cart state/count. Fail if the item remains or an unrelated item is removed.

#### 3.3. Reject an invalid discount coupon

**File:** `tests/cart/coupon-validation.spec.ts`

**Steps:**
  1. Start from a fresh session and add an eligible catalog item to the cart.
    - expect: The cart displays the item and discount-code control.
  2. Enter a deliberately invalid coupon code and choose Apply coupon.
    - expect: An explicit invalid/unrecognized coupon message is shown; no discount is applied and cart totals remain correct. Fail if an invalid code changes totals or no feedback is shown.

#### 3.4. Estimate shipping for a destination

**File:** `tests/cart/shipping-estimate.spec.ts`

**Steps:**
  1. Start from a fresh session, add a shippable product, and open the cart's Estimate shipping section.
    - expect: Destination controls for country and, where applicable, state/province and postal code are available.
  2. Choose a supported destination and enter a valid fictitious postal code, then request the estimate.
    - expect: Available shipping option(s) and cost are shown for the selected destination without changing cart contents. Fail if the estimate is missing or unrelated to the selected destination.

#### 3.5. Configure and add a gift card

**File:** `tests/cart/gift-card.spec.ts`

**Steps:**
  1. Start from a fresh session and open the Gift Cards category. Choose a gift card with recipient/purchaser fields.
    - expect: The product page displays its price/denomination and required gift-card personalization fields.
  2. Enter fictitious recipient and sender names/emails and a message if offered, select a denomination/quantity as applicable, and add it to the cart.
    - expect: The configured gift card is added and the cart preserves its selected value and recipient details. Fail if required details are lost or the wrong denomination is added.

#### 3.6. Complete checkout as a guest

**File:** `tests/checkout/guest-checkout.spec.ts`

**Steps:**
  1. Start from a fresh logged-out session with an empty cart. Add an in-stock product, open the cart, leave the terms of service unchecked, and choose Checkout.
    - expect: Checkout is blocked and a clear terms-of-service prompt is displayed; the cart remains intact. Fail if checkout proceeds or the cart is cleared.
  2. Accept the terms and retry Checkout; choose guest checkout when offered. Enter complete fictitious billing/shipping details and select available shipping and demo payment options, proceeding through checkout steps.
    - expect: Guest checkout is available; valid required fields are accepted and the review step shows selected items, address, shipping, and correct totals.
  3. Confirm using only the demo's test payment flow; do not use real payment credentials.
    - expect: A successful order confirmation/order number is displayed and cart state is cleared. Fail if the order is not confirmed, details/totals differ, or real payment is requested.

#### 3.7. Place an order while signed in

**File:** `tests/checkout/registered-checkout.spec.ts`

**Steps:**
  1. Start from a fresh session. Provision a disposable customer account, sign in, add an in-stock product, open the cart, accept the terms, and choose Checkout.
    - expect: Authenticated checkout begins without requesting guest identity again.
  2. Use fictitious saved or newly entered billing/shipping information, select available demo shipping/payment options, review, and confirm the order.
    - expect: Order confirmation shows the expected product and correct total; no real payment details are used.
  3. Open the signed-in account's Orders page.
    - expect: The newly completed order appears with a consistent reference/status. Fail if confirmation or order history omits the submitted order.
