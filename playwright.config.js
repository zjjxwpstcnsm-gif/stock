import { defineConfig } from '@playwright/test';
const port = Number(process.env.PORT || 4173);
export default defineConfig({
  testDir: './tests/browser',
  use: { baseURL: `http://127.0.0.1:${port}`, headless: true, screenshot: 'only-on-failure' },
  projects: [
    { name: 'desktop', use: { viewport: { width: 1440, height: 1050 } } },
    { name: 'mobile', use: { viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true } },
  ],
  webServer: { command: 'node scripts/serve.js', url: `http://127.0.0.1:${port}`, reuseExistingServer: !process.env.CI },
  reporter: [['list'], ['html', {open:'never'}]],
});
