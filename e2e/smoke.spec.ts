import { test, expect } from '@playwright/test';

test('has parent gate heading on first launch', async ({ page }) => {
  await page.goto('/');
  await expect(page.locator('h2')).toContainText('ASK AN ADULT');
});
