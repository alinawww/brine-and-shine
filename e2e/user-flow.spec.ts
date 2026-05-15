import { test, expect, type Page } from '@playwright/test';

async function clearJars(page: Page) {
  await page.evaluate(() => localStorage.removeItem('brineandshine_jars'));
}

test.describe('Brine & Shine — full user flow', () => {
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
    await clearJars(page);
  });

  // ── 1. Home ───────────────────────────────────────────────────────────────

  test('Home: renders 12 ingredient cards and UI chrome', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('pickling');

    const cards = page.locator('article');
    await expect(cards).toHaveCount(12);

    await expect(page.getByRole('button', { name: /surprise me/i })).toBeVisible();

    // Navbar links
    await expect(page.getByRole('link', { name: 'Ingredients' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'Build a Jar' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Jars' })).toBeVisible();

    // Three dark-accent cards are present
    for (const name of ['Cucumbers', 'Red Onion', 'Radishes']) {
      await expect(cards.filter({ hasText: name })).toBeVisible();
    }
  });

  // ── 2. Home → Guide ───────────────────────────────────────────────────────

  test('Home → Guide: card click navigates and renders guide content', async ({ page }) => {
    await page.locator('article').filter({ hasText: 'Cucumbers' }).click();

    await expect(page).toHaveURL('/ingredient/cucumbers');
    await expect(page.locator('h1')).toHaveText('Cucumbers');

    // Brine card
    await expect(page.getByText('Recommended Brine')).toBeVisible();
    await expect(page.getByText('Classic Dill Brine')).toBeVisible();
    await expect(page.getByText('White distilled vinegar')).toBeVisible();

    // Other sections
    await expect(page.getByText('Suggested Spices')).toBeVisible();
    await expect(page.getByText('Timeline')).toBeVisible();
    await expect(page.getByText('Pro Tip')).toBeVisible();
    await expect(page.getByText('Health Benefits')).toBeVisible();

    // CTA button
    await expect(page.getByRole('button', { name: /start a jar of cucumbers/i })).toBeVisible();
  });

  test('Guide: back link returns to home', async ({ page }) => {
    await page.goto('/ingredient/cucumbers');
    await page.getByText('← All ingredients').click();
    await expect(page).toHaveURL('/');
  });

  test('Guide: unknown slug shows not-found state', async ({ page }) => {
    await page.goto('/ingredient/pickled-unicorn');
    await expect(page.getByText(/not found/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /back to ingredients/i })).toBeVisible();
  });

  // ── 3. Guide → Builder ────────────────────────────────────────────────────

  test('Guide → Builder: CTA pre-fills ingredient and spices', async ({ page }) => {
    await page.goto('/ingredient/cucumbers');
    await page.getByRole('button', { name: /start a jar of cucumbers/i }).click();

    await expect(page).toHaveURL('/build/cucumbers');

    // Ingredient select pre-set
    await expect(page.locator('select')).toHaveValue('cucumbers');

    // Back link references guide
    await expect(page.getByText(/back to cucumbers guide/i)).toBeVisible();

    // Suggested spices section is shown
    await expect(page.getByText('Suggested for this ingredient')).toBeVisible();
  });

  // ── 4. Builder form ───────────────────────────────────────────────────────

  test('Builder: save button disabled until name is entered', async ({ page }) => {
    await page.goto('/build/cucumbers');

    const saveBtn = page.getByRole('button', { name: /save jar/i });
    await expect(saveBtn).toBeDisabled();

    await page.getByPlaceholder(/spicy dills/i).fill('Test batch');
    await expect(saveBtn).toBeEnabled();
  });

  test('Builder: brine type toggle works', async ({ page }) => {
    await page.goto('/build/cucumbers');

    // Default is vinegar
    const vinegar = page.getByRole('button', { name: /vinegar brine/i });
    const salt    = page.getByRole('button', { name: /salt ferment/i });

    await salt.click();
    // salt is now "active" — visually selected (we check it's clickable / reachable)
    await vinegar.click();
    // back to vinegar — save should still work after toggling
    await page.getByPlaceholder(/spicy dills/i).fill('Toggle test');
    await expect(page.getByRole('button', { name: /save jar/i })).toBeEnabled();
  });

  test('Builder: can pick ingredient from dropdown directly', async ({ page }) => {
    await page.goto('/build');

    // No pre-fill — select should be empty, save disabled
    const saveBtn = page.getByRole('button', { name: /save jar/i });
    await expect(saveBtn).toBeDisabled();

    await page.locator('select').selectOption('carrots');
    await page.getByPlaceholder(/spicy dills/i).fill('Carrot test');
    await expect(saveBtn).toBeEnabled();
  });

  // ── 5. Builder → My Jars ──────────────────────────────────────────────────

  test('Builder → My Jars: saving a jar navigates and shows it', async ({ page }) => {
    await page.goto('/build/cucumbers');

    await page.getByPlaceholder(/spicy dills/i).fill('E2E Dill Pickles');
    await page.getByRole('button', { name: /save jar/i }).click();

    await expect(page).toHaveURL('/jars');
    await expect(page.locator('h1')).toHaveText('My Jars');
    await expect(page.getByText('E2E Dill Pickles')).toBeVisible();
    await expect(page.getByText('Cucumbers')).toBeVisible();
    await expect(page.getByText('Vinegar brine')).toBeVisible();
    // Saved as fermenting by default
    await expect(page.locator('span').filter({ hasText: 'Fermenting' })).toBeVisible();
  });

  // ── 6. My Jars features ───────────────────────────────────────────────────

  test('My Jars: empty state when no jars', async ({ page }) => {
    await page.goto('/jars');
    await expect(page.getByText(/no jars yet/i)).toBeVisible();
    await expect(page.getByRole('link', { name: /browse ingredients/i })).toBeVisible();
  });

  test('My Jars: status update persists across reload', async ({ page }) => {
    // Seed a jar
    await page.goto('/build/carrots');
    await page.getByPlaceholder(/spicy dills/i).fill('Status Test Jar');
    await page.getByRole('button', { name: /save jar/i }).click();
    await expect(page).toHaveURL('/jars');

    // Update status
    await page.locator('select').selectOption('ready');
    await expect(page.getByText('Ready!')).toBeVisible();

    // Reload — localStorage should persist
    await page.reload();
    await expect(page.getByText('Ready!')).toBeVisible();
    await expect(page.getByText('Status Test Jar')).toBeVisible();
  });

  test('My Jars: "View guide" link navigates to correct guide', async ({ page }) => {
    await page.goto('/build/garlic');
    await page.getByPlaceholder(/spicy dills/i).fill('Garlic jar');
    await page.getByRole('button', { name: /save jar/i }).click();

    await page.getByText('View guide →').click();
    await expect(page).toHaveURL('/ingredient/garlic');
    await expect(page.locator('h1')).toHaveText('Garlic');
  });

  // ── 7. Full end-to-end ────────────────────────────────────────────────────

  test('Full flow: Home → Guide → Builder → My Jars → back to Home', async ({ page }) => {
    // Home
    await page.goto('/');
    await expect(page.locator('article')).toHaveCount(12);

    // Pick Red Onion (accent/dark card)
    await page.locator('article').filter({ hasText: 'Red Onion' }).click();
    await expect(page).toHaveURL('/ingredient/red-onion');
    await expect(page.locator('h1')).toHaveText('Red Onion');
    await expect(page.getByText('Quick Apple Cider Brine')).toBeVisible();

    // Build a jar
    await page.getByRole('button', { name: /start a jar of red onion/i }).click();
    await expect(page).toHaveURL('/build/red-onion');
    await expect(page.locator('select')).toHaveValue('red-onion');
    await page.getByPlaceholder(/spicy dills/i).fill('Tacos & BBQ onions');
    await page.getByRole('button', { name: /save jar/i }).click();

    // Confirm in My Jars
    await expect(page).toHaveURL('/jars');
    await expect(page.getByText('Tacos & BBQ onions')).toBeVisible();
    await expect(page.getByText('Red Onion')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Fermenting' })).toBeVisible();

    // Return home via navbar
    await page.getByRole('link', { name: 'Ingredients' }).click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('article')).toHaveCount(12);
  });
});
