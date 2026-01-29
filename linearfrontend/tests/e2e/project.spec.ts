import { test, expect } from '@playwright/test';

test.describe('Project Management', () => {
  test('should create a project successfully', async ({ page }) => {
    // 1. Login
    await page.goto('/login');
    // Adjust selectors to match your actual Login form
    await page.getByPlaceholder('name@example.com').fill('admin@example.com'); 
    await page.getByPlaceholder('password').fill('password');
    await page.getByRole('button', { name: 'Sign in' }).click();

    // Wait for navigation to dashboard
    await expect(page.getByText('Dashboard')).toBeVisible({ timeout: 10000 });

    // 2. Navigate to Projects
    await page.goto('/projects');
    await expect(page.getByRole('heading', { name: 'Projects' })).toBeVisible();

    // 3. Create Project
    await page.getByRole('button', { name: 'New Project' }).click();
    await expect(page.getByRole('dialog')).toBeVisible(); // Sheet uses dialog role often

    await page.getByLabel('Name').fill('E2E Test Project');
    await page.getByLabel('Description').fill('Created via Playwright');

    // Select first available team
    // We assume there's at least one team in the dropdown
    const select = page.locator('select#team');
    await expect(select).toBeVisible();
    await select.selectOption({ index: 1 }); // Index 0 is disabled label

    await page.getByRole('button', { name: 'Create Project' }).click();

    // 4. Verify Creation
    // Wait for modal to close
    await expect(page.getByRole('dialog')).toBeHidden();
    
    // Check if new project appears in list
    await expect(page.getByText('E2E Test Project')).toBeVisible();

    // 5. Verify Sidebar
    // Click "Projects" dropdown if not open, then check for project name
    const projectsNav = page.getByRole('button', { name: 'Projects' });
    await expect(projectsNav).toBeVisible();
    
    // It might be collapsed or Expanded. 
    // If we assume it starts collapsed or expanded, we might need to toggle.
    // However, playwright locator 'E2E Test Project' should find it if it's in the DOM, 
    // unless visibility is hidden.
    // Let's assume user wants to see it.
    await projectsNav.click(); // Ensure expanded
    
    // Check if sub-item exists
    await expect(page.getByRole('link', { name: 'E2E Test Project' })).toBeVisible();
  });
});
