// @ts-check
import { defineConfig, devices } from '@playwright/test';

export default defineConfig({

  // ─── TEST RUNNER SETTINGS (outside use:{}) ────────────────────────────────
  testDir: './tests',
  fullyParallel: false,
  forbidOnly: !!process.env.CI,
  retries: process.env.CI ? 2 : 1,
  workers: process.env.CI ? 4 : 1,
  reporter: 'html',

  // Max time one test can run before it is marked as failed
  timeout: 30_000,

  // Max time expect() assertions wait before failing
  expect: {
    timeout: 5_000,
  },

  // ─── BROWSER / PAGE SETTINGS (inside use:{}) ──────────────────────────────
  // Everything here is shared across all tests and all projects
  use: {
    baseURL: 'https://3de.in',          // page.goto('/login') works instead of full URL
    headless: true,                      // run without opening a visible browser window
    screenshot: 'only-on-failure',       // save screenshot when a test fails
    video: 'retain-on-failure',          // save video when a test fails
    trace: 'on-first-retry',             // save trace on first retry for debugging
    actionTimeout: 10_000,               // max wait for click / fill / select etc.
    navigationTimeout: 30_000,           // max wait for page.goto() / reload()
  },

  // ─── PROJECTS (browser-specific overrides) ────────────────────────────────
  projects: [
    {
      name: 'chromium',
      use: {
        ...devices['Desktop Chrome'],
        launchOptions: { args: ['--disable-gpu'] },
      },
    },

    // {
    //   name: 'firefox',
    //   use: { ...devices['Desktop Firefox'] },
    // },

    // {
    //   name: 'webkit',
    //   use: { ...devices['Desktop Safari'] },
    // },
  ],
});
