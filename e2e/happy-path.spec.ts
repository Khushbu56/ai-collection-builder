import { test, expect } from '@playwright/test'

test.describe('AI Collection Builder - Happy Path', () => {
  test.beforeEach(async ({ page }) => {
    // Navigate to the app
    await page.goto('http://localhost:5173/')
  })

  test('user can complete the full wizard flow', async ({ page }) => {
    // Step 1: Input step - verify heading and input
    await expect(page.getByRole('heading', { name: /Create Your Collection/i })).toBeVisible()
    const textarea = page.getByPlaceholder(/Wedding gift/)
    await expect(textarea).toBeVisible()

    // Type prompt
    const testPrompt = 'Wedding gift collection for Sarah and John'
    await textarea.fill(testPrompt)
    await expect(textarea).toHaveValue(testPrompt)

    // Click generate button
    const generateBtn = page.getByRole('button', { name: /Generate Collections/i })
    await generateBtn.click()

    // Step 2: Preview step - wait for templates to load
    await page.waitForTimeout(3000) // Wait for API response (1.5-2.5s delay)
    await expect(page.getByRole('heading', { name: /Choose a template/i })).toBeVisible()

    // Verify templates are rendered
    const cards = page.getByRole('button', { name: /suggested donations/ })
    const cardCount = await cards.count()
    expect(cardCount).toBeGreaterThan(0)

    // Select first template
    const firstCard = cards.first()
    await firstCard.click()

    // Verify selection state
    await expect(firstCard.locator('text=Selected')).toBeVisible()
  })

  test('user can interact with suggestion chips', async ({ page }) => {
    // Click on suggestion chip
    const weddingChip = page.getByRole('button', { name: 'Wedding' })
    await expect(weddingChip).toBeVisible()
    await weddingChip.click()

    // Should trigger submission
    await page.waitForTimeout(3000)
    await expect(page.getByRole('heading', { name: /Choose a template/i })).toBeVisible()
  })

  test('error handling works correctly', async ({ page }) => {
    // Type error keyword
    const textarea = page.getByPlaceholder(/Wedding gift/)
    await textarea.fill('error test')

    // Submit
    const generateBtn = page.getByRole('button', { name: /Generate Collections/i })
    await generateBtn.click()

    // Wait for API error response
    await page.waitForTimeout(3000)

    // Verify error message appears
    await expect(page.getByRole('alert')).toBeVisible()
    await expect(page.getByText(/Failed to generate templates/i)).toBeVisible()

    // Retry button should be present
    const retryBtn = page.getByRole('button', { name: /Try Again/i })
    await expect(retryBtn).toBeVisible()
  })
})
