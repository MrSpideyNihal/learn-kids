import { test, expect } from '@playwright/test';

test('completes parent gate, creates profile, navigates tabs and interacts with gameplay', async ({ page }) => {
  // Mock API routes to avoid MongoDB/Serverless dependencies in E2E tests
  await page.route('**/api/player*', async (route) => {
    const method = route.request().method();
    if (method === 'GET') {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          success: true,
          player: {
            playerId: 'usr_test',
            nickname: 'SuperKid',
            avatarId: 'lion',
            coins: 10,
            studioUnlocked: false,
          },
        }),
      });
    } else {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ success: true }),
      });
    }
  });

  await page.route('**/api/score*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        coinsEarned: 10,
        newCoinBalance: 20,
      }),
    });
  });

  await page.route('**/api/leaderboard/daily*', async (route) => {
    await route.fulfill({
      status: 200,
      contentType: 'application/json',
      body: JSON.stringify({
        success: true,
        leaderboard: [
          { playerId: 'usr_test', nickname: 'SuperKid', score: 100, coinsEarned: 20, rank: 1 },
        ],
        playerRank: null,
      }),
    });
  });

  // Navigate to application
  await page.goto('/');

  // 1. Solve Parent Gate Math Check
  const gateText = await page.locator('div.text-3xl').innerText();
  const numbers = gateText.match(/\d+/g);
  if (!numbers) throw new Error('Numbers not found in parent gate');
  const sum = parseInt(numbers[0], 10) + parseInt(numbers[1], 10);

  await page.locator('input[type="number"]').fill(String(sum));
  await page.click('button:has-text("Confirm")');

  // 2. Nickname and Avatar Onboarding
  await expect(page.locator('h2')).toContainText('CHOOSE YOUR PROFILE');
  await page.locator('input[placeholder="Your cute nickname"]').fill('SuperKid');
  await page.click('button:has-text("Let\'s Play!")');

  // 3. Guess Game default screen
  await expect(page.locator('text=Streak: 0')).toBeVisible();

  // 4. Navigate to Leaderboard
  // Since sidebar and bottom nav are responsive, click whichever tab button is present
  await page.click('[aria-label="Go to Leaderboard"]');
  await expect(page.locator('h2')).toContainText('Daily Top Ranks');

  // 5. Navigate to Drawing Studio (Locked Screen)
  await page.click('[aria-label="Go to Studio"]');
  await expect(page.locator('h2')).toContainText('Drawing Studio');
});
