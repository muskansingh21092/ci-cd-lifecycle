import { test as base, expect, type Page } from '@playwright/test';

const LOGIN_URL = 'https://3de.in/login';
const DASHBOARD_URL = 'https://3de.in/dashboard';
const CREDENTIALS = { email: 'muskan972114@gmail.com', password: 'Mus@1234' };

type DashboardFixtures = { dashboardPage: Page };

const test = base.extend<DashboardFixtures>({
  dashboardPage: async ({ page }, use) => {
    await page.goto(LOGIN_URL);
    await page.getByLabel(/email/i).fill(CREDENTIALS.email);
    await page.getByLabel(/password/i).fill(CREDENTIALS.password);
    await page.getByRole('button', { name: /log in/i }).click();
    await page.waitForURL(DASHBOARD_URL, { timeout: 15_000 });
    await use(page);
  },
});

test('S01 - Valid login redirects to dashboard @smoke', async ({ dashboardPage: page }) => {
  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(page).not.toHaveURL(/login/);
});

test('R01 - Unauthenticated access to dashboard redirects to login @regression', async ({ page }) => {
  await page.goto(DASHBOARD_URL);
  await expect(page).toHaveURL(/login/);
});

test('SR01 - Dashboard session persists on page refresh @smoke @regression', async ({ dashboardPage: page }) => {
  await page.reload();
  await expect(page).toHaveURL(DASHBOARD_URL);
  await expect(page).not.toHaveURL(/login/);
});
