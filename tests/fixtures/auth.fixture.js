// @ts-check
const { test: base } = require('@playwright/test');

const LOGIN_URL = 'https://3de.in/login';
const DASHBOARD_URL = 'https://3de.in/dashboard';

const CREDENTIALS = {
  email: 'muskan972114@gmail.com',
  password: 'Mus@1234',
};

const test = base.extend({
  dashboardPage: async ({ page }, use) => {
    await page.goto(LOGIN_URL);
    await page.getByLabel(/email/i).fill(CREDENTIALS.email);
    await page.getByLabel(/password/i).fill(CREDENTIALS.password);
    await page.getByRole('button', { name: /log in/i }).click();
    await page.waitForURL(DASHBOARD_URL, { timeout: 15_000 });
    await use(page);
  },
});

const { expect } = require('@playwright/test');

module.exports = { test, expect, CREDENTIALS, LOGIN_URL, DASHBOARD_URL };
