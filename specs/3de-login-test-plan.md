# Test Plan: 3de.in Login Page

**Application:** https://3de.in/login  
**Service:** 3de — Custom 3D Printed Products (PETG · PLA · Resin)  
**Prepared:** 2026-06-21  
**Scope:** Login page, Forgot Password flow, and related navigation  

---

## Application Overview

The 3de login page provides authentication for a 3D printing e-commerce service. Key entry points:

| Page | URL |
|------|-----|
| Login | https://3de.in/login |
| Forgot Password | https://3de.in/forgot-password |
| Main Storefront | https://3de.in |

**UI Elements on Login Page:**
- Email address input field
- Password input field with "Forgot?" recovery link
- "Remember me on this device" checkbox
- "Log in" button (shows "Signing in..." during submission)
- "Continue with Google" OAuth button
- "Don't have an account? Sign up" link
- "← Back to shop" navigation link

---

## Sanity Tests

Sanity tests verify the application is fundamentally operational. These must pass before any deeper testing is done.

---

### S01 — Login Page Loads with All Expected UI Elements

**Pre-conditions:** Fresh browser session, no prior authentication, no cookies.

**Steps:**
1. Open a new browser tab.
2. Navigate to `https://3de.in/login`.
3. Wait for the page to fully load.
4. Verify the page title contains "3de".
5. Verify the heading "Welcome back" is visible.
6. Verify the Email input field is visible and enabled.
7. Verify the Password input field is visible and enabled.
8. Verify the "Log in" button is visible and enabled.
9. Verify the "Continue with Google" button is visible.
10. Verify the "Forgot?" link is visible near the password field.
11. Verify the "Don't have an account? Sign up" link is visible.
12. Verify the "← Back to shop" link is visible.

**Expected Outcome:** All elements are present and the page renders without errors or broken assets.

**Pass Criteria:** All 8 UI elements are visible and the page returns HTTP 200.  
**Fail Criteria:** Any element is missing, page fails to load, or console shows critical JS errors.

---

### S02 — Forgot Password Link Navigates to Reset Page

**Pre-conditions:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Locate the "Forgot?" link next to the password field.
3. Click the "Forgot?" link.
4. Wait for the next page to load.
5. Verify the URL contains "forgot" or "reset".
6. Verify an Email input field is visible on the new page.
7. Verify a submit button (e.g., "Email Password Reset Link") is visible and enabled.

**Expected Outcome:** User is taken to the password reset page with an email input form.

**Pass Criteria:** URL changes to forgot-password page; email field and submit button are visible.  
**Fail Criteria:** Link does nothing, navigates to wrong page, or reset page fails to load.

---

### S03 — Back to Shop Link Navigates to Main Storefront

**Pre-conditions:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Locate the "← Back to shop" link.
3. Click the link.
4. Wait for the page to load.
5. Verify the URL does not contain "/login".
6. Verify the main storefront content is visible (e.g., 3de branding, products, or shop navigation).

**Expected Outcome:** User is redirected away from the login page to the main 3de storefront.

**Pass Criteria:** URL no longer contains "/login"; storefront content is visible.  
**Fail Criteria:** Navigation fails, user remains on login page, or a 404/error page is shown.

---

## Regression Tests

Regression tests cover edge cases, error handling, and flows that are most likely to break between releases.

---

### R01 — Login with Invalid Email Format Shows Validation Error

**Pre-conditions:** Fresh browser session, login page loaded, no user is logged in.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Click the Email input field.
3. Type `notanemail` (plain text without "@" or domain).
4. Click the Password input field.
5. Type any non-empty password (e.g., `testpassword`).
6. Click the "Log in" button.
7. Observe the validation feedback on the email field.

**Expected Outcome:** Browser native validation or in-app validation prevents form submission and highlights the email field with an error (e.g., "Please include an '@' in the email address").

**Pass Criteria:** Form is not submitted; email field shows a validation error; user remains on `/login`.  
**Fail Criteria:** Form submits despite invalid email; no error is shown; user is redirected.

---

### R02 — Login with Incorrect Credentials Shows Error Message

**Pre-conditions:** Fresh browser session, login page loaded. Uses a non-existent or wrong-password account.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Enter `wrong@example.com` in the Email field.
3. Enter `WrongPassword123!` in the Password field.
4. Click the "Log in" button.
5. Wait for the response (button may show "Signing in..." briefly).
6. Observe the page for an error/alert message.

**Expected Outcome:** An error message is displayed (e.g., "Invalid email or password", "Incorrect credentials", or similar). User remains on the login page.

**Pass Criteria:** Error message is visible; URL remains `/login`; no redirect to a dashboard.  
**Fail Criteria:** No error is shown; user is unexpectedly logged in; page crashes or shows a 500 error.

---

### R03 — Submitting Empty Login Form Shows Required Field Validation

**Pre-conditions:** Fresh browser session, login page loaded. Both fields are empty.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Do not enter any value in the Email field.
3. Do not enter any value in the Password field.
4. Click the "Log in" button.
5. Observe which field receives focus or shows a validation message.

**Expected Outcome:** The form is not submitted. The browser or application highlights the first required field (Email) with a "Please fill in this field" or equivalent message.

**Pass Criteria:** Submission is blocked; at least the email field shows a required-field error; URL remains `/login`.  
**Fail Criteria:** Empty form is submitted; no validation message appears; any redirect occurs.

---

### R04 — Forgot Password Submission with Invalid Email Format Is Blocked

**Pre-conditions:** Fresh browser session, no prior authentication.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Click the "Forgot?" link to reach the password reset page.
3. Enter `invalidemail` (no "@" or domain) in the Email field.
4. Click the "Email Password Reset Link" button.
5. Observe the validation feedback.

**Expected Outcome:** Submission is blocked. Email field shows a format validation error. User remains on the forgot-password page.

**Pass Criteria:** Form is not submitted; email validation error is visible; URL remains on the forgot-password page.  
**Fail Criteria:** Form submits with invalid email; no validation error shown; unexpected redirect.

---

### R05 — "Remember Me" Checkbox Toggles Correctly

**Pre-conditions:** Fresh browser session, login page loaded.

**Steps:**
1. Navigate to `https://3de.in/login`.
2. Locate the "Remember me on this device" checkbox.
3. Verify the checkbox is **unchecked** by default.
4. Click the checkbox to check it.
5. Verify the checkbox is now **checked**.
6. Click the checkbox again to uncheck it.
7. Verify the checkbox is now **unchecked** again.

**Expected Outcome:** The checkbox correctly toggles between checked and unchecked states with each click.

**Pass Criteria:** Default state is unchecked; checkbox correctly reflects checked/unchecked after each click.  
**Fail Criteria:** Checkbox does not respond to clicks; state does not visually change; checkbox is missing.

---

## Test Coverage Summary

| ID | Title | Type | Priority |
|----|-------|------|----------|
| S01 | Login page loads with all expected UI elements | Sanity | Critical |
| S02 | Forgot password link navigates to reset page | Sanity | Critical |
| S03 | Back to shop link navigates to main storefront | Sanity | High |
| R01 | Invalid email format shows validation error | Regression | High |
| R02 | Incorrect credentials shows error message | Regression | Critical |
| R03 | Empty form submission shows required field validation | Regression | High |
| R04 | Forgot password with invalid email is blocked | Regression | Medium |
| R05 | Remember me checkbox toggles correctly | Regression | Medium |
