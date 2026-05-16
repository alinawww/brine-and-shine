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

  test('Home: renders ingredient cards and UI chrome', async ({ page }) => {
    await expect(page.locator('h1')).toContainText('pickling');

    const cards = page.locator('article');
    // 12 custom ingredients + ready-made pickles
    await expect(cards).toHaveCount(22);

    await expect(page.getByRole('button', { name: /surprise me/i })).toBeVisible();

    // Navbar links
    await expect(page.getByRole('link', { name: 'Build a Jar' })).toBeVisible();
    await expect(page.getByRole('link', { name: 'My Jars' })).toBeVisible();

    // Three salt-brine (dark) cards are present
    for (const name of ['Cucumbers', 'Radishes', 'Cabbage']) {
      await expect(cards.filter({ has: page.locator('h3', { hasText: name }) })).toBeVisible();
    }
  });

  // ── 2. Home → Guide ───────────────────────────────────────────────────────

  test('Home → Guide: card click navigates and renders guide content', async ({ page }) => {
    // Use .first() since "Cucumbers" also appears in descriptions of other cards
    await page.locator('article').filter({ hasText: 'Cucumbers' }).first().click();

    await expect(page).toHaveURL('/ingredient/cucumber');
    await expect(page.locator('h1')).toHaveText('Cucumbers');

    // Guide sections
    await expect(page.getByRole('heading', { name: 'Brine' })).toBeVisible();
    await expect(page.getByRole('heading', { name: 'Timeline' })).toBeVisible();
    await expect(page.getByText(/Pro Tip/)).toBeVisible();

    // CTA button
    await expect(page.getByRole('button', { name: /start a jar of cucumbers/i })).toBeVisible();
  });

  test('Guide: back link returns to home', async ({ page }) => {
    await page.goto('/ingredient/cucumber');
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
    await page.goto('/ingredient/cucumber');
    await page.getByRole('button', { name: /start a jar of cucumbers/i }).click();

    await expect(page).toHaveURL(/\/build\/cucumber/);

    // Ingredient is locked — shown as chip with "(primary)" label
    await expect(page.getByText('(primary)')).toBeVisible();

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
    await page.goto('/build/cucumber');

    // cucumber default is salt brine
    const vinegar = page.getByRole('button', { name: /vinegar brine/i });
    const salt    = page.getByRole('button', { name: /salt brine/i });

    await vinegar.click();
    await salt.click();
    // Save should work after toggling (jar name is pre-filled for /build/cucumber)
    await expect(page.getByRole('button', { name: /save jar/i })).toBeEnabled();
  });

  test('Builder: can pick ingredient from dropdown selector', async ({ page }) => {
    await page.goto('/build');

    // No ingredient selected — save button not shown
    await expect(page.getByRole('button', { name: /save jar/i })).not.toBeVisible();

    // Select Carrots from the dropdown
    await page.locator('select').first().selectOption('carrot');

    // Now form shows — fill name and save
    await page.getByPlaceholder(/spicy dills/i).fill('Carrot test');
    await expect(page.getByRole('button', { name: /save jar/i })).toBeEnabled();
  });

  // ── 5. Builder → My Jars ──────────────────────────────────────────────────

  test('Builder → My Jars: saving a jar navigates and shows it', async ({ page }) => {
    await page.goto('/build/cucumber');

    await page.getByPlaceholder(/spicy dills/i).fill('E2E Dill Pickles');
    await page.getByRole('button', { name: /save jar/i }).click();

    await expect(page).toHaveURL('/jars');
    await expect(page.locator('h1')).toHaveText('My Jars');
    await expect(page.getByText('E2E Dill Pickles')).toBeVisible();
    await expect(page.getByText('Cucumbers')).toBeVisible();
    // cucumber uses salt brine by default
    await expect(page.getByText('Salt ferment')).toBeVisible();
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
    // Seed a jar (using invalid slug so jarName starts empty)
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
    await expect(page.locator('article')).toHaveCount(22);

    // Pick Red Onion card
    await page.locator('article').filter({ hasText: 'Red Onion' }).first().click();
    await expect(page).toHaveURL('/ingredient/redOnion');
    await expect(page.locator('h1')).toHaveText('Red Onion');

    // Guide has brine section and CTA
    await expect(page.getByRole('heading', { name: 'Brine' })).toBeVisible();

    // Build a jar
    await page.getByRole('button', { name: /start a jar of red onion/i }).click();
    await expect(page).toHaveURL(/\/build\/redOnion/);

    // Ingredient is locked
    await expect(page.getByText('(primary)')).toBeVisible();

    await page.getByPlaceholder(/spicy dills/i).fill('Tacos & BBQ onions');
    await page.getByRole('button', { name: /save jar/i }).click();

    // Confirm in My Jars
    await expect(page).toHaveURL('/jars');
    await expect(page.getByText('Tacos & BBQ onions')).toBeVisible();
    await expect(page.getByText('Red Onion')).toBeVisible();
    await expect(page.locator('span').filter({ hasText: 'Fermenting' })).toBeVisible();

    // Return home via logo
    await page.locator('header a').first().click();
    await expect(page).toHaveURL('/');
    await expect(page.locator('article')).toHaveCount(22);
  });
});
