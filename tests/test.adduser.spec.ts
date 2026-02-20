import { test, expect } from '@playwright/test';

test.beforeEach(async ({ page }) => {
  await page.goto('/');
});

test('Verify that user is able to registrate with valid data', async ({ page }) => {
  await page.getByTestId('username-field').getByTestId('input').click();
  await page.getByTestId('username-field').getByTestId('input').fill('admin');
  await page.getByTestId('password-field').getByTestId('input').click();
  await page.getByTestId('password-field').getByTestId('input').fill('123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByTestId('logout-button')).toBeVisible();
});

test('Verify that user is unable to registrated with empty form', async ({ page }) => {
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByTestId('username-field').getByTestId('error-msg')).toHaveText(
    'Username is required.',
  );
  await expect(page.getByTestId('password-field').getByTestId('error-msg')).toHaveText(
    'Password  is required.',
  );
});

test('Verify that user is unable to registrated with Invalid password', async ({ page }) => {
  await page.getByTestId('username-field').getByTestId('input').click();
  await page.getByTestId('username-field').getByTestId('input').fill('admin');
  await page.getByTestId('password-field').getByTestId('input').click();
  await page.getByTestId('password-field').getByTestId('input').fill('321');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByTestId('form-error-msg')).toHaveText('Invalid username or password.');
});

test('Verify that user unable to registrate with invalid username', async ({ page }) => {
  await page.getByTestId('username-field').getByTestId('input').click();
  await page.getByTestId('username-field').getByTestId('input').fill('qwer');
  await page.getByTestId('password-field').getByTestId('input').click();
  await page.getByTestId('password-field').getByTestId('input').fill('123');
  await page.getByRole('button', { name: 'Sign in' }).click();

  await expect(page.getByTestId('form-error-msg')).toHaveText('Invalid username or password.');
});
