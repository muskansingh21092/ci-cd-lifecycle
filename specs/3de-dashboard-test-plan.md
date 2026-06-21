# Test Plan: 3de.in Dashboard

**Application:** https://3de.in/dashboard  
**Auth required:** Yes — `muskan972114@gmail.com`  
**Prepared:** 2026-06-21  
**Spec file:** `tests/3de-dashboard.spec.ts`  
**Fixture file:** `tests/fixtures/auth.fixture.ts`

---

## Fixture Strategy

Login is managed in a shared Playwright fixture (`dashboardPage`) so credentials are maintained in one place and every test that needs auth just uses `dashboardPage` instead of `page`.

```
tests/
  fixtures/
    auth.fixture.ts   ← login fixture (single source of truth for credentials)
  3de-dashboard.spec.ts
```

Tests tagged `@regression` that verify *unauthenticated* behavior use the raw `page` fixture directly.

---

## Smoke Tests `@smoke`

| ID | Title | Purpose |
|----|-------|---------|
| S01 | Valid login redirects to dashboard | Confirms auth + redirect flow works end-to-end |
| S02 | Dashboard page loads with key UI sections visible | Confirms the page renders without blank/broken state |
| S03 | Logout is accessible and redirects to login | Confirms the user can exit an authenticated session |

---

## Regression Tests `@regression`

| ID | Title | Purpose |
|----|-------|---------|
| R01 | Unauthenticated access to /dashboard redirects to login | Route guard is enforced |
| R02 | Dashboard session persists on page refresh | Session cookie / token survives a reload |
| R03 | Logout + back button does not restore the session | Token is properly invalidated on logout |
| R04 | Correct user email is shown on dashboard | UI reflects the signed-in account |
| R05 | Wrong password does not open the dashboard | Auth cannot be bypassed with bad credentials |

---

## Common Tests `@common`

| ID | Title | Purpose |
|----|-------|---------|
| C01 | Dashboard page has a valid title | Checks basic SEO/branding |
| C02 | Logo navigates back to the storefront | Core navigation works from dashboard |
| C03 | No horizontal overflow (responsive check) | Layout integrity across viewports |
| C04 | No critical JS errors on dashboard load | JS runtime health |

---

## How to Run

```bash
# All dashboard tests
npx playwright test tests/3de-dashboard.spec.ts

# By tag
npx playwright test --grep @smoke
npx playwright test --grep @regression
npx playwright test --grep @common

# Multiple tags
npx playwright test --grep "@smoke|@common"
```
