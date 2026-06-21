import { test as base, expect, type Page } from '@playwright/test';

const LOGIN_URL = 'https://3de.in/login';

type LoginFixtures = { loginPage: Page };

const test = base.extend<LoginFixtures>({
  loginPage: async ({ page }, use) => {
    await page.goto(LOGIN_URL);
    await use(page);
  },
});

test('S01 - Login page loads with all expected UI elements @smoke', async ({ loginPage: page }) => {
  await expect(page).toHaveTitle(/3de/i);
  await expect(page.getByRole('heading', { name: /welcome back/i })).toBeVisible();
  await expect(page.getByLabel(/email/i)).toBeVisible();
  await expect(page.getByLabel(/password/i)).toBeVisible();
  await expect(page.getByRole('button', { name: /log in/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /continue with google/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /sign up/i })).toBeVisible();
  await expect(page.getByRole('link', { name: /back to shop/i })).toBeVisible();
});

test('R01 - Wrong credentials show an error message @regression', async ({ loginPage: page }) => {
  await page.getByLabel(/email/i).fill('wrong@example.com');
  await page.getByLabel(/password/i).fill('WrongPassword123!');
  await page.getByRole('button', { name: /log in/i }).click();
  await expect(page.getByText(/these credentials do not match/i)).toBeVisible({ timeout: 8000 });
  await expect(page).toHaveURL(/login/);
});

test('SR01 - Empty form submission is blocked by validation @smoke @regression', async ({ loginPage: page }) => {
  await page.getByRole('button', { name: /log in/i }).click();
  await expect(page).toHaveURL(/login/);
  await expect(page.getByLabel(/email/i)).toBeFocused();
});
