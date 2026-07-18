import { test, expect } from '@playwright/test';

test('has title and renders main get started heading', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h1')).toContainText('Get started');
});
