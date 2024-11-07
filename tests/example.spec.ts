import { test, expect } from '@playwright/test';

test.describe('Next.js Homepage', () => {
  // Navigate to homepage before each test
  test.beforeEach(async ({ page }) => {
    await page.goto('/');
  });

  // Test page title and basic rendering
  test('renders homepage correctly', async ({ page }) => {
    // Check page title
    await expect(page).toHaveTitle(/Create Next App/);

    // Verify Next.js logo is visible
    const nextLogo = page.getByAltText('Next.js logo');
    await expect(nextLogo).toBeVisible();
  });

  // Test getting started instructions
  test('displays getting started instructions', async ({ page }) => {
    // Check instruction text
    const instructionText = page.getByText(
      'Get started by editing src/app/page.tsx'
    );
    await expect(instructionText).toBeVisible();
  });

  // Test deploy button functionality
  test('deploy button links to Vercel', async ({ page }) => {
    const deployButton = page.getByText('Deploy now');

    // Verify button attributes
    await expect(deployButton).toBeVisible();
    await expect(deployButton).toHaveAttribute(
      'href',
      expect.stringContaining('vercel.com/new')
    );
  });

  // Test documentation link
  test('documentation link works', async ({ page }) => {
    const docsLink = page.getByText('Read our docs');

    await expect(docsLink).toBeVisible();
    await expect(docsLink).toHaveAttribute(
      'href',
      expect.stringContaining('nextjs.org/docs')
    );
  });

  // Test footer links
  test('footer links are present and correct', async ({ page }) => {
    const footerLinks = [
      { text: 'Learn', urlContains: 'nextjs.org/learn' },
      { text: 'Examples', urlContains: 'vercel.com/templates' },
      { text: 'Go to nextjs.org →', urlContains: 'nextjs.org' }
    ];

    for (const link of footerLinks) {
      const linkElement = page.getByText(link.text);
      await expect(linkElement).toBeVisible();
      await expect(linkElement).toHaveAttribute(
        'href',
        expect.stringContaining(link.urlContains)
      );
    }
  });

  // // Test dark mode / responsive design
  // test('supports dark mode and responsive design', async ({ page }) => {
  //   // Toggle dark mode
  //   await page.emulateMedia({ colorScheme: 'dark' });

  //   // Check for dark mode specific elements
  //   const darkModeElements = page.locator('.dark\\:invert');
  //   await expect(darkModeElements).toHaveCount(3); // Next.js logo, Vercel logo, etc.

  //   // Test responsive behavior
  //   await page.setViewportSize({ width: 375, height: 667 }); // Mobile view
  //   const mobileLayout = page.locator('.flex-col');
  //   await expect(mobileLayout).toBeVisible();
  // });

  // Accessibility test
  test('passes basic accessibility checks', async ({ page }) => {
    const accessibilityResults = await page.accessibility.snapshot();
    expect(accessibilityResults.children.length).toBeGreaterThan(0);
  });
});
