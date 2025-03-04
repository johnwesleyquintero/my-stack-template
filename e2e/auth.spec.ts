import { test, expect } from '@playwright/test'

test.describe('Authentication', () => {
  test('shows login form', async ({ page }) => {
    await page.goto('/login')

    // Check form elements
    await expect(page.getByRole('heading', { name: 'Login' })).toBeVisible()
    await expect(page.getByLabel('Email')).toBeVisible()
    await expect(page.getByLabel('Password')).toBeVisible()
    await expect(page.getByRole('button', { name: 'Sign in' })).toBeVisible()
  })

  test('shows validation errors', async ({ page }) => {
    await page.goto('/login')

    // Click sign in without filling form
    await page.getByRole('button', { name: 'Sign in' }).click()

    // Check error messages
    await expect(page.getByText('Email is required')).toBeVisible()
    await expect(page.getByText('Password is required')).toBeVisible()
  })

  test('navigates to forgot password', async ({ page }) => {
    await page.goto('/login')

    await page.getByRole('link', { name: 'Forgot password?' }).click()
    await expect(page).toHaveURL('/forgot-password')
  })
})
